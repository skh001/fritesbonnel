import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, Send, Plus, Minus, Trash2, CheckCircle, Snowflake, ZoomIn, ZoomOut, Search, AlertTriangle } from 'lucide-react'; 
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

// --- NOUVEAU : IMPORTATION DE TOUTES LES IMAGES (CONSERVATION DES NOMS D'IMPORTS ORIGINAUX) ---
// Import des images des Mugs
import mug from '../assets/merch/mug.jpg'; 
import mugDesign2 from '../assets/merch/mug-design2.jpg'; 

// Import T-shirt Original (ID 1)
import tShirtDefault from '../assets/merch/t-shirt.jpg';
import tShirtBleu from '../assets/merch/t-shirt-bleu.jpg'; 
// import tShirtNoir from '../assets/merch/t-shirt-noir.jpg';         // <-- RETIRÉ DE L'UTILISATION
import tShirtRouge from '../assets/merch/t-shirt-rouge.jpg';      

// Import Sweatshirt (ID 2)
import sweatDefault from '../assets/merch/sweat.jpg';
import sweatBleu from '../assets/merch/sweat-bleu.jpg'; 
// import sweatNoir from '../assets/merch/sweat-noir.jpg';           // <-- RETIRÉ DE L'UTILISATION
import sweatRouge from '../assets/merch/sweat-rouge.jpg';

// Import T-shirt Vintage (V2) (ID 4) - ONLY IMPORTING AVAILABLE IMAGES
import tShirtVintageDefault from '../assets/merch/t-shirt-vintage.jpg'; 
import tShirtVintageRouge from '../assets/merch/t-shirt-vintage-rouge.jpg';      
// --- FIN DES IMPORTS D'IMAGES ---

// --- CONFIGURATION GLOBALE ---
const SIZES = ["S", "M", "L", "XL"];
const COLORS = ["Bleu Marine", "Rouge"]; // <-- MODIFIÉ : "Noir" retiré
const DEFAULT_COLOR = COLORS[0]; // "Bleu Marine"
// --- LISTE DES LIEUX DE RETRAIT ---
const PICKUP_LOCATIONS = [
    "Pathé cinéma Angers - Du mardi au vendredi midi, et du vendredi au dimanche soir.",
    "La Bestiole Angers - Jeudi midi",
    "La Minute Blonde Angers - Vendredi midi",
    "Cours Saint Laud à Angers - Mercredi midi "
];
// ----------------------------

// --- CONFIGURATION À PERSONNALISER ---
const WEB3FORMS_ACCESS_KEY = "21a9b7c2-ca12-415f-9893-f37fb69acaa5"; 

const RIB_INFO = {
  iban: "FR76 1790 6000 3296 3882 4397 720", 
  bic: "AGRIFRPP879", 
  titulaire: "S.A.R.L. VHELP ",
};

const PICKUP_INFO = {
  location: "La friterie, point de vente au Pathé Cinéma, Angers",
  instructions: "Veuillez effectuer un virement bancaire sur le RIB ci-dessus. Une fois le virement reçu, votre commande sera validée. Vous pourrez ensuite venir récupérer vos articles à notre point de vente au Pathé Cinéma aux heures d'ouverture."
};

// Tableau de données de vos produits
const products = [
  { 
    id: 1, 
    name: "T-shirt Frites Bonnel (Illustration classique)", 
    description: "T-shirt 100% coton, impression quadrichromie. 195gr, Illustration de Bérengère Louineau. Design classique.", 
    price: 24.00, 
    hasOptions: true, 
    // Utilisation de la variable importée
    image: tShirtDefault, 
    colorImages: {
        "Bleu Marine": tShirtBleu, // <-- CONSERVÉ
        "Rouge": tShirtRouge,      
    }
  },
  { 
    id: 2, 
    name: "Sweat à Capuche (Illustration classique)", 
    description: "Veste zippée a capuche, impression quadrichromie. 280gr, Illustration de Bérengère Louineau. Confort et style.", 
    price: 52.00, 
    hasOptions: true, 
    // Utilisation de la variable importée
    image: sweatDefault,
    colorImages: {
        "Bleu Marine": sweatBleu, // <-- CONSERVÉ
        "Rouge": sweatRouge,
    }
  },
  { 
    id: 4, // ID du second T-shirt
    name: "T-shirt Frites Bonnel ", 
    description: "T-shirt 100% coton, impression sérigraphie.", 
    price: 18.00, // Nouveau prix
    hasOptions: true, 
    // Utilisation de la variable importée
    image: tShirtVintageDefault,
    // ONLY INCLUDING THE RED IMAGE HERE
    colorImages: {
        "Rouge": tShirtVintageRouge,      
    }
  },
  { 
    id: 3, 
    name: "Mug Frites Bonnel (Par Dyn)", 
    description: "Mug en céramique ", 
    price: 9.50, 
    hasOptions: false, 
    // Utilisation de la variable importée
    image: mug
  },
  { 
    id: 5, // Nouvel ID pour le second mug
    name: "Mug Frites Bonnel (Par Bérengère Louineau)", 
    description: "Mug en céramique", 
    price: 9.50, 
    hasOptions: false, 
    // Utilisation de la variable importée
    image: mugDesign2
  },
];
// --- FIN CONFIGURATION ---

// --- COMPOSANT MODALE D'AGRANDISSEMENT ET ZOOM MIS À JOUR ---
const ImageModal = ({ product, currentSelections, updateSelection, addToCart, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const selection = currentSelections[product.id] || { quantity: 1, size: '', color: product.hasOptions ? DEFAULT_COLOR : '' }; // Utilise DEFAULT_COLOR = "Bleu Marine"

    const toggleZoom = () => {
        setTranslate({ x: 0, y: 0 }); 
        setZoomLevel(zoomLevel === 1 ? 2 : 1);
    };

    const currentSrc = product.colorImages && selection.color
        ? product.colorImages[selection.color] || product.image
        : product.image;
    const currentAlt = product.colorImages && selection.color
        ? `${product.name} (${selection.color})`
        : product.name;


    // Logique de glissement (drag) pour le déplacement
    const handleMouseDown = (e) => {
        if (zoomLevel === 2) {
            setIsDragging(true);
            setStartDrag({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || zoomLevel !== 2) return;

        const dx = e.clientX - startDrag.x;
        const dy = e.clientY - startDrag.y;
        
        setTranslate({
            x: translate.x + dx,
            y: translate.y + dy,
        });

        setStartDrag({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Réinitialisation au changement de modale/fermeture
    useEffect(() => {
        if (!isOpen) {
            setZoomLevel(1);
            setTranslate({ x: 0, y: 0 });
        }
    }, [isOpen]);


    // Fonction d'ajout au panier depuis la modale
    const handleAddToCart = () => {
        addToCart(product);
        if (product.hasOptions && (!selection.size || !selection.color)) {
            return;
        }
        onClose(); 
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[100] p-0 md:p-4 transition-opacity duration-300" 
            onClick={onClose}
        >
            <div 
                // CONTENEUR PRINCIPAL : Hauteur fixe sur mobile pour forcer le défilement INTERNE
                className="relative bg-white p-4 rounded-none md:rounded-xl max-w-5xl max-h-full md:max-h-[95vh] w-full shadow-2xl flex flex-col md:flex-row overflow-y-auto" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Bouton de fermeture en haut à droite */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2 shadow-xl hover:bg-gray-700 transition-colors z-10"
                >
                    ✕
                </button>


                {/* BLOC GAUCHE: IMAGE ET ZOOM */}
                <div className="md:w-3/5 w-full pr-0 md:pr-4 flex flex-col">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2 mt-6 md:mt-0">{currentAlt}</h4>
                    
                    <div 
                        // Hauteur : 40vh sur mobile, 70vh sur desktop
                        className="overflow-hidden rounded-lg relative w-full h-[40vh] md:h-[70vh] flex items-center justify-center bg-gray-100"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img 
                            src={currentSrc} 
                            alt={currentAlt} 
                            className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `scale(${zoomLevel}) translate(${translate.x}px, ${translate.y}px)`,
                                cursor: zoomLevel === 2 ? (isDragging ? 'grabbing' : 'grab') : 'default', 
                                transformOrigin: 'center center' 
                            }}
                        />
                    </div>
                    <p className='text-xs text-gray-500 text-center pt-2'>
                        {zoomLevel === 2 ? 'Utilisez la souris pour glisser et explorer les détails.' : 'Cliquez sur "Zoomer" pour agrandir l\'image.'}
                    </p>
                </div>
                
                {/* BLOC DROIT: DESCRIPTION, CONTROLES ET ACHAT RAPIDE */}
                <div 
                    className="md:w-2/5 w-full pt-4 md:pt-0 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col space-y-4" 
                >
                    
                    {/* DESCRIPTION */}
                    <div>
                        <h5 className="text-lg font-bold text-red-600 mb-2">Détails du Produit</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* --- ACHAT RAPIDE --- */}
                    <div className='p-4 border border-gray-200 rounded-lg bg-gray-50 mt-auto'>
                        <h6 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                            <ShoppingCart className='w-4 h-4 mr-2 text-red-600'/> Acheter cet Article
                        </h6>
                        
                        {product.hasOptions && (
                            <>
                                {/* SÉLECTEUR TAILLE */}
                                <select
                                    value={selection.size}
                                    onChange={(e) => updateSelection('size', e.target.value, product.id)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg mb-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="" disabled>-- Taille -- *</option>
                                    {SIZES.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>

                                {/* SÉLECTEUR COULEUR */}
                                <select
                                    value={selection.color}
                                    onChange={(e) => updateSelection('color', e.target.value, product.id)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg mb-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="" disabled={!selection.color}>-- Couleur -- *</option>
                                    {Object.keys(product.colorImages).map(color => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {/* QUANTITÉ */}
                        <div className="flex items-center justify-between mt-3">
                            <span className='font-bold text-lg'>{product.price.toFixed(2)} €</span>
                            
                            <div className='flex items-center space-x-2'>
                                <label className="text-sm font-medium text-gray-700">Qté:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={selection.quantity}
                                    onChange={(e) => {
                                        const qty = parseInt(e.target.value) || 1; 
                                        const finalQty = Math.max(1, qty); 
                                        updateSelection('quantity', finalQty, product.id);
                                    }}
                                    className="w-16 px-2 py-1 text-center border rounded-lg focus:ring-red-500"
                                />
                            </div>
                        </div>

                        {/* BOUTON AJOUTER */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-red-600 text-white py-2 mt-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
                        >
                            Ajouter {selection.quantity} Article(s)
                        </button>

                    </div>
                    {/* --- FIN ACHAT RAPIDE --- */}
                    
                    {/* Contrôles de Zoom */}
                    <div className="mt-4 flex flex-col space-y-2">
                        <button 
                            onClick={toggleZoom}
                            className={`flex items-center justify-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md ${
                                zoomLevel === 1 
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        >
                            {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
                            <span>{zoomLevel === 1 ? 'Activer le Zoom Détaillé (x2)' : 'Retour à l\'Aperçu Normal'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// -----------------------------------------------------------------


const BoutiquePage = () => {
  const [cart, setCart] = useState([]);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', pickupLocation: '', details: '' }); // This line is now correct
  const [currentSelections, setCurrentSelections] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  // MISE À JOUR : Récupérer la description complète du produit
  const handleImageClick = (product) => {
    setSelectedProduct(product); // Stocke le produit complet
    
    // Si l'utilisateur n'a pas encore fait de sélection de couleur sur la carte, 
    // nous initialisons la sélection dans l'état global (currentSelections) à la première couleur valide 
    // pour que l'image s'affiche correctement dans la modale.
    if (product.hasOptions && !currentSelections[product.id]?.color) {
        // Use Object.keys to find the first available color for this product
        const availableColors = Object.keys(product.colorImages);
        const defaultColor = availableColors.length > 0 ? availableColors[0] : '';
        
        if (defaultColor) {
             // Mise à jour de l'état global
            setCurrentSelections(prev => ({ 
                ...prev, 
                [product.id]: { 
                    ...(prev[product.id] || { quantity: 1, size: '', color: '' }),
                    color: defaultColor 
                } 
            }));
        }
    }
    
    setIsImageModalOpen(true);
  };
  
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }, [cart]);


  // FIX : Bloquer le défilement
  useEffect(() => {
    if (isImageModalOpen || showCheckout || showSuccessPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen, showCheckout, showSuccessPopup]);


  const addToCart = (product) => {
    const defaultSelection = { quantity: 1, size: '', color: '' };
    // Use the first available color of the product if options are present
    const availableColors = product.hasOptions ? Object.keys(product.colorImages) : [];
    const productDefaultColor = availableColors.length > 0 ? availableColors[0] : '';
    
    const selection = currentSelections[product.id] || 
                      (product.hasOptions ? { ...defaultSelection, color: productDefaultColor } : defaultSelection);
    
    // If the product has options, we must check for size and color
    if (product.hasOptions && (!selection.size || !selection.color)) {
      alert(`Veuillez sélectionner la taille ET la couleur pour le ${product.name}.`);
      return;
    }
    
    const optionString = product.hasOptions 
        ? `Taille: ${selection.size} / Couleur: ${selection.color}` 
        : undefined;

    if (selection.quantity < 1) return;

    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && item.sizeColor === optionString
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += selection.quantity;
      setCart(newCart);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: selection.quantity,
        sizeColor: optionString,
      };
      setCart([...cart, newItem]);
    }
    
    // Reset selection state to the product's default color or empty after adding to cart
    setCurrentSelections(prev => ({ 
      ...prev, 
      [product.id]: product.hasOptions ? { ...defaultSelection, color: productDefaultColor } : defaultSelection 
    }));
  };

  const updateSelection = (field, value, productId) => {
    setCurrentSelections(prev => ({ 
        ...prev, 
        [productId]: { 
            ...prev[productId] || { quantity: 1, size: '', color: '' },
            [field]: value 
        } 
    }));
  };
  
  const updateCartQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };
  
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // --- FONCTION DE SOUMISSION UNIQUE (Web3Forms pour Email) ---
  const generateAndDownloadPDF = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Vérification ajoutée pour le lieu de retrait
    if (cart.length === 0 || !clientInfo.name || !clientInfo.email || !clientInfo.phone || !clientInfo.pickupLocation) {
        alert("Veuillez remplir toutes les informations requises, y compris l'endroit où vous souhaitez récupérer la commande.");
        return;
    }
    
    // 1. GÉNÉRATION ET TÉLÉCHARGEMENT DU PDF (Inchangé)
    const pdfContent = document.createElement('div');
    pdfContent.style.width = '210mm';
    pdfContent.style.padding = '20mm';
    pdfContent.style.backgroundColor = '#fff';
    pdfContent.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #c53030; border-bottom: 3px solid #fbd38d; padding-bottom: 10px;">Votre Réservation Frites Bonnel</h1>
        <p style="text-align: right; font-size: 14px;">Date: ${new Date().toLocaleDateString('fr-FR')}</p>
        <h2 style="color: #c53030; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Informations Client</h2>
        <p><strong>Nom:</strong> ${clientInfo.name}</p>
        <p><strong>Téléphone:</strong> ${clientInfo.phone}</p>
        <p><strong>Email:</strong> ${clientInfo.email}</p>
        <p><strong>Lieu de Retrait:</strong> ${clientInfo.pickupLocation}</p>
        ${clientInfo.details ? `<p><strong>Commentaires:</strong> ${clientInfo.details}</p>` : ''}
        <h2 style="color: #c53030; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Détail de la Commande</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #fbd38d;">
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Article</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Options</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Prix Unitaire</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">Qté</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ccc; padding: 8px;">${item.sizeColor || 'N/A'}</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${item.price.toFixed(2)} €</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="border: 1px solid #ccc; padding: 10px; text-align: right; font-size: 18px; font-weight: bold;">TOTAL À PAYER</td>
              <td style="border: 1px solid #ccc; padding: 10px; text-align: right; font-size: 18px; font-weight: bold; background-color: #fbd38d;">${totalAmount} €</td>
            </tr>
          </tfoot>
        </table>

        <h2 style="color: #c53030; margin-top: 40px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Modalités de Paiement et Retrait</h2>

        <div style="border: 2px dashed #c53030; padding: 15px; margin-top: 15px; background-color: #fefc4c20;">
          <p style="font-weight: bold; font-size: 16px; color: #c53030;">PAIEMENT OBLIGATOIRE PAR VIREMENT BANCAIRE</p>
          <p style="margin-top: 10px; font-size: 14px;">Pour valider votre réservation, vous devez effectuer un **virement bancaire** du montant total (${totalAmount} €) sur le compte ci-dessous.</p>
          
          <div style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; background-color: #fff;">
            <p style="font-weight: bold;">RIB Frites Bonnel</p>
            <p><strong>Titulaire du compte :</strong> ${RIB_INFO.titulaire}</p>
            <p><strong>IBAN :</strong> <span style="font-weight: bold; color: #c53030;">${RIB_INFO.iban}</span></p>
            <p><strong>BIC :</strong> ${RIB_INFO.bic}</p>
          </div>
          
          <p style="margin-top: 20px; font-weight: bold; color: #c53030;">RETRAIT DE LA COMMANDE</p>
          <p style="font-size: 14px;">Vous avez choisi de récupérer votre commande à : <strong>${clientInfo.pickupLocation}</strong>. Une fois le virement reçu, votre commande sera validée.</p>
          <p style="font-size: 14px; margin-top: 10px;">*Veuillez conserver ce document et le présenter lors du retrait.*</p>
        </div>
      </div>
    `;

    document.body.appendChild(pdfContent);
    await new Promise(resolve => setTimeout(resolve, 50)); 
    const canvas = await html2canvas(pdfContent, { scale: 2, useCORS: true, logging: false });
    document.body.removeChild(pdfContent);

    const imgData = canvas.toDataURL('image/jpeg');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Reservation_FritesBonnel_${clientInfo.name.replace(/\s/g, '_')}.pdf`);
    
    // 2. ENVOI À WEB3FORMS (Notification Email)
    
    const commandeDetailsString = cart.map(item => 
        `${item.quantity} x ${item.name} (${item.sizeColor || 'N/A'})`
    ).join(' | '); 

    const formData = {
        access_key: WEB3FORMS_ACCESS_KEY, 
        subject: `[MERCH] Nouvelle Réservation - ${clientInfo.name} (${totalAmount} €)`,
        Nom_Client: clientInfo.name,
        Email_Client: clientInfo.email,
        Telephone_Client: clientInfo.phone,
        Lieu_de_Retrait: clientInfo.pickupLocation, // Ajout pour l'email
        Commentaires_Client: clientInfo.details || 'Aucun',
        DETAIL_COMMANDE: commandeDetailsString, 
        TOTAL_A_PAYER: `${totalAmount} €`,
        ACTION: "Virement bancaire en attente de validation.",
    };
    
    try {
        const response = await fetch("https://api.web3forms.com/submit", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 8000); 

            setCart([]);
            setClientInfo({ name: '', phone: '', email: '', details: '', pickupLocation: '' }); // Réinitialisation du nouveau champ
            setShowCheckout(false);
            setSubmitError(null);
        } else {
             setSubmitError(`PDF téléchargé. ERREUR Email (W3F) : ${result.message || "Échec d'envoi. Veuillez vérifier votre clé d'accès."}`);
        }

    } catch (error) {
         setSubmitError(`PDF téléchargé. Erreur de connexion réseau critique. Le panier n'a pas été vidé. Détail: ${error.message}`);
    }
  };


  // Composant de carte de produit simplifié pour le catalogue
  const ProductCard = ({ product }) => {
    // MODIFICATION 1: Utiliser la couleur par défaut si aucune sélection n'est faite
    const availableColors = product.hasOptions ? Object.keys(product.colorImages) : [];
    const productDefaultColor = availableColors.length > 0 ? availableColors[0] : '';
    const defaultSelection = { quantity: 1, size: '', color: product.hasOptions ? productDefaultColor : '' };
    const currentSelection = currentSelections[product.id] || defaultSelection;
    const priceDisplay = (product.price).toFixed(2).replace('.', ',');

    const updateSelection = (field, value, productId) => {
        setCurrentSelections(prev => ({ 
            ...prev, 
            [productId]: { 
                ...prev[productId] || defaultSelection,
                [field]: value 
            } 
        }));
    };
    
    // DÉTERMINER LA SOURCE DE L'IMAGE EN TEMPS RÉEL
    const currentImageSrc = 
        product.colorImages && currentSelection.color // Vérifie si le produit a des images par couleur ET si une couleur est choisie
        ? product.colorImages[currentSelection.color] || product.image // Choisit l'image couleur spécifique ou l'image par défaut
        : product.image; // Sinon, utilise l'image par défaut

    // DÉTERMINER L'ALT TEXT EN FONCTION DE LA COULEUR
    const currentImageAlt = 
        product.colorImages && currentSelection.color
        ? `${product.name} (${currentSelection.color})`
        : product.name;


    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center border-4 border-white hover:border-red-400 transition-colors duration-300"> 
        
        {/* BLOC IMAGE CLICQUABLE AVEC ICÔNE LOUPE */}
        <div 
            onClick={() => handleImageClick(product)} // PASSE TOUT LE PRODUIT
            className="w-full h-48 relative cursor-pointer overflow-hidden rounded-xl mb-4 group"
        >
            <img 
                src={currentImageSrc} 
                alt={currentImageAlt} 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* ICÔNE LOUPE STYLÉE */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Search className="w-8 h-8 text-white bg-red-600 p-1 rounded-full shadow-xl" />
            </div>
        </div>

        <h4 className="text-xl font-semibold text-red-600 text-center mb-2">{product.name}</h4>
        <p className="text-gray-700 text-center mb-4 text-sm">{product.description}</p>
        <div className="w-full text-center text-lg font-bold text-red-600 mb-4">{priceDisplay} €</div>
        
        {product.hasOptions && (
          <div className="w-full flex space-x-2 mb-2">
            <select
                value={currentSelection.size}
                onChange={(e) => updateSelection('size', e.target.value, product.id)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
            >
                <option value="" disabled>-- Taille -- *</option>
                {SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                ))}
            </select>

            {/* SÉLECTEUR DE COULEUR (MISE À JOUR) */}
            <select
                value={currentSelection.color}
                onChange={(e) => updateSelection('color', e.target.value, product.id)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
            >
                {/* Dynamically display available colors for this product */}
                <option value="" disabled={currentSelection.color !== ''}>-- Couleur -- *</option>
                {Object.keys(product.colorImages).map(color => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>
          </div>
        )}
        
        <div className="flex items-center space-x-2 w-full">
          <label className="text-sm font-medium text-gray-700">Qté:</label>
          <input
            type="number"
            min="1"
            value={currentSelection.quantity}
            onChange={(e) => {
              const qty = parseInt(e.target.value) || 1; 
              const finalQty = Math.max(1, qty); 
              updateSelection('quantity', finalQty, product.id);
            }}
            className="w-16 px-2 py-1 text-center border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button
            onClick={() => addToCart(product)}
            className="flex-grow bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-1 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    );
  };
  
  // Rendu principal du composant
  return (
    <div className="space-y-16 bg-white min-h-screen"> 
      
      {/* Bannière de la boutique */}
      <section className="bg-red-600 text-white py-16 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-4 flex items-center justify-center space-x-4">
            <Snowflake className="w-8 h-8 text-yellow-300 animate-pulse" />
            <span>La boutique de Noël</span>
            <Snowflake className="w-8 h-8 text-yellow-300 animate-pulse" />
          </h2>
          <p className="text-xl text-red-100">
            Réservez vos produits et payez par virement pour un retrait facile !
          </p>
        </div>
      </section>

      {/* --- SECTION : STORYTELLING --- */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center bg-yellow-50 p-8 rounded-2xl shadow-xl border-t-4 border-red-600">
          <h3 className="text-3xl font-bold text-red-600 mb-4">La petite histoire</h3>
          <p className="text-gray-700 text-lg leading-relaxed space-y-2">
            {/* Découpage du paragraphe en blocs distincts pour les sauts de ligne */}
            <span>
                Les illustrations originales créées par Bérengère Louineau font écho à nos racines et à nos valeurs.
            </span>
            <br className="my-1"/>
            <span>
                <strong>Nos racines :</strong> le Nord avec ses façades flamandes, un moment de plaisir autour d’un repas, 
            </span>
            <br className="my-1"/>
            <span>
                le début du XXᵉ siècle qui a vu prospérer la brasserie Bonnel de nos aïeux.
            </span>
            <br className="my-1"/>
            <span>
                <strong>Nos valeurs :</strong> la bonne humeur partagée, le soin apporté à la qualité du service, 
            </span>
            <br className="my-1"/>
            <span>
                la générosité des produits et des équipes.
            </span>
            <br className="my-1"/>
            <span>
                En créant cette boutique de Noël, nous souhaitons vous faire plaisir. Nous travaillons avec L’Atelier Moutarde de Beaulieu-sur-Layon qui fait le choix d’impressions textiles de qualité en sérigraphie et en quadrichromie. Les tarifs des produits permettent de couvrir les frais de création, d’impression et de logistique.
                Nous restons avant tout une friterie, pour vous servir. 
            </span>
            <br className="my-2"/>
            <span className='font-bold'>
                Vincent Pécourt
            </span>
          </p>
        </div>
      </section>
      {/* --- FIN SECTION : STORYTELLING --- */}
      
      {/* --- NOUVELLE SECTION : DISCLAIMER IMPORTANT (Position Corrigée) --- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl shadow-xl flex items-start space-x-3 animate-pulse-slow">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
                <h3 className="text-lg font-bold text-red-700 mb-1">Information Importante</h3>
                <p className="text-sm text-gray-700">
                    Notre boutique est ouverte du <strong>1er au 23 novembre</strong>. Vous avez jusqu’à cette date pour passer commande sur notre nouveau site internet et régler le montant total par <strong>virement bancaire</strong>. Les textiles seront imprimés en Anjou selon vos souhaits, en quantités limitées. Nous vous adresserons un <strong>email de confirmation</strong> dès que votre commande sera prête ! Du <strong>8 au 20 décembre</strong>, vous pourrez récupérer votre colis sur le site demandé en présentant le message de confirmation. 
                </p>
            </div>
        </div>
      </section>
      {/* --- FIN SECTION : DISCLAIMER IMPORTANT --- */}

      {/* Catalogue de produits */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Collection Frites Bonnel</h3>
        {/* FIX APPLIED HERE: Ensure the className string is correctly closed */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Panier et Checkout */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-3xl font-bold text-red-600 text-center mb-12 flex items-center justify-center space-x-3">
            <ShoppingCart className="w-8 h-8"/>
            <span>Votre Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </h3>
        
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-red-200">
            {cart.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">Votre panier est vide. Ajoutez des articles pour passer commande.</p>
            ) : (
                <>
                    {/* Détail du Panier */}
                    <div className="space-y-4 mb-6">
                        {cart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    {item.sizeColor && <p className="text-sm text-gray-500">{item.sizeColor}</p>}
                                    <p className="text-sm font-bold text-red-600">{(item.price).toFixed(2)} € / unité</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button 
                                        onClick={() => updateCartQuantity(index, -1)} 
                                        className="p-1 border rounded-full hover:bg-red-100"
                                    ><Minus className="w-4 h-4 text-red-600" /></button>
                                    <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateCartQuantity(index, 1)} 
                                        className="p-1 border rounded-full hover:bg-red-100"
                                    ><Plus className="w-4 h-4 text-red-600" /></button>
                                </div>
                                <div className="ml-6 text-right w-20">
                                    <p className="font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)} €</p>
                                    <button 
                                        onClick={() => removeFromCart(index)} 
                                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                                    ><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total et bouton de Checkout */}
                    <div className="border-t pt-4 flex justify-between items-center">
                        <h4 className="text-2xl font-bold text-red-600">TOTAL À PAYER:</h4>
                        <span className="text-2xl font-bold text-red-600">{totalAmount} €</span>
                    </div>

                    <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-[#fffd67] text-red-600 py-3 mt-6 rounded-lg font-semibold hover:bg-[#fefc4c] transition-colors flex items-center justify-center space-x-2 shadow-lg"
                        disabled={cart.length === 0}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Passer au Paiement par Virement</span>
                    </button>
                </>
            )}
        </div>
      </section>
      
      {/* Modale de Paiement (Checkout) */}
      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h3 className="text-2xl font-bold text-red-600">Finaliser la Réservation</h3>
                <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-red-600">✕</button>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg mb-6 border border-yellow-300">
                <p className="font-bold text-gray-800">Total à régler : {totalAmount} €</p>
                <p className="text-sm text-gray-700 mt-1">Le paiement se fera par virement bancaire après confirmation.</p>
            </div>
            
            <form onSubmit={generateAndDownloadPDF} className="space-y-4">
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                  <strong className="font-bold">Erreur !</strong>
                  <span className="block sm:inline"> {submitError}</span>
                </div>
              )}
              
              <h4 className="text-xl font-semibold text-red-600">Vos Informations (pour la facture)</h4>
              
              {/* NOM, EMAIL, TÉLÉPHONE */}
              <input
                type="text"
                name="client_name"
                placeholder="Votre Nom Complet *"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="email"
                name="client_email"
                placeholder="Votre Email *"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="tel"
                name="client_phone"
                placeholder="Votre Téléphone *"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />

              {/* LIEU DE RETRAIT */}
              <select
                name="pickupLocation"
                value={clientInfo.pickupLocation}
                onChange={(e) => setClientInfo({ ...clientInfo, pickupLocation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700"
                required
              >
                <option value="" disabled>Où souhaitez-vous récupérer votre commande ? *</option>
                {PICKUP_LOCATIONS.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
              </select>

              {/* COMMENTAIRES */}
              <textarea
                name="details"
                placeholder="Commentaires (ex: précisions pour le retrait)"
                rows={2}
                value={clientInfo.details}
                onChange={(e) => setClientInfo({ ...clientInfo, details: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              ></textarea>
              
              <div className="bg-red-50 p-4 rounded-lg text-sm">
                <p className="font-bold text-red-600 mb-2">Étape Finale : Récapitulatif et Paiement</p>
                <p>En cliquant sur le bouton ci-dessous, un document PDF contenant le récapitulatif de votre commande et le RIB de Frites Bonnel S.A.R.L VHelp sera **téléchargé**.</p>
                <p className="mt-2 font-bold">Vous devrez effectuer un virement pour valider définitivement la commande.</p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span>Confirmer et Télécharger la Facture ({totalAmount} €)</span>
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* POPUP DE CONFIRMATION DE SUCCÈS (INCHANGÉ) */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-sm w-full animate-in fade-in zoom-in">
                <CheckCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Réservation Enregistrée !
                </h3>
                <p className="text-gray-700 mb-4">
                    Le récapitulatif (PDF) a été téléchargé. Vous recevrez une confirmation de commande par email.
                </p>
                <p className="text-sm font-semibold text-red-600">
                    Veuillez procéder au virement bancaire pour valider votre achat.
                </p>
                <button
                    onClick={() => setShowSuccessPopup(false)}
                    className="mt-4 bg-[#fffd67] text-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-[#fefc4c] transition-colors shadow-md"
                >
                    Fermer
                </button>
            </div>
        </div>
      )}

      {/* --- MODALE D'AGRANDISSEMENT D'IMAGE (COMPOSANT STABLE) --- */}
      <ImageModal 
          product={selectedProduct} // PASSE LE PRODUIT COMPLET
          currentSelections={currentSelections} // PASSE LES SÉLECTIONS
          updateSelection={updateSelection} // PASSE LA FONCTION DE MISE À JOUR
          addToCart={addToCart} // PASSE LA FONCTION AJOUTER AU PANIER
          isOpen={isImageModalOpen} 
          onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
};

export default BoutiquePage;