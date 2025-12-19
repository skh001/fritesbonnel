import React, { useState } from 'react';
import { Phone, Mail, MapPin, Users, Heart, Cake, Send } from 'lucide-react';

// *** CONSTANTES POUR LE SERVICE DE DEVIS WEB3FORMS (Unique) ***
// Clé d'accès pour le formulaire de devis Web3Forms
const WEB3FORMS_ACCESS_KEY = "e175876a-0531-43d9-8ddb-01a752ea2344";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// ***************************************************************


const EvenementsPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false); 
    
    // NOUVEAU : État pour suivre le type d'événement sélectionné
    const [eventType, setEventType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        // --- 1. Préparation des données pour l'envoi JSON (Logique du Merch/Devis) ---
        const jsonData = {};
        formData.forEach((value, key) => { 
            jsonData[key] = value 
        });

        // Ajout de la clé d'accès
        jsonData.access_key = WEB3FORMS_ACCESS_KEY;

        // Construction du sujet personnalisé avec Nom + Prénom
        const nom = jsonData.event_client_lastname || '';
        const prenom = jsonData.event_client_firstname || '';
        const fullName = `${nom} ${prenom}`.trim();
        
        // Si c'est une entreprise, on l'ajoute au sujet pour plus de clarté
        let subjectPrefix = "[DEVIS]";
        if (jsonData.company_name) {
            subjectPrefix += ` [PRO - ${jsonData.company_name}]`;
        }

        jsonData.subject = `${subjectPrefix} Nouvelle Demande - ${fullName || 'Inconnu'}`;
        

        // --- 2. Envoi à Web3Forms (Stockage fiable + Email) ---
        try {
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: "POST",
                // IMPORTANT : On utilise 'application/json' pour Web3Forms
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData), // Envoi des données en format JSON
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Succès : le formulaire est stocké et l'e-mail a été envoyé
                form.reset();
                setEventType(""); // Réinitialiser le select
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 5000);
                
            } else {
                // Échec de l'API Web3Forms
                console.error("Échec de l'envoi du formulaire (Web3Forms) :", result);
                setSubmitError(`Une erreur est survenue lors de l'envoi de votre demande. Détail : ${result.message || "Erreur de connexion."}`);
            }

        } catch (error) {
            console.error("Erreur réseau lors de l'envoi du formulaire:", error);
            setSubmitError("Connexion impossible. Veuillez vérifier votre connexion internet et réessayer.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="space-y-16">
            <section className="bg-red-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Événements & Privatisations</h2>
                    <p className="text-xl text-white">
                        Frites Bonnel vous accompagne dans tous vos événements et privatisations .
                    </p>
                </div>
            </section>

            {/* Nos Services Événementiels */}
            <section className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Nos Services Événementiels</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Heart, title: "Lendemain de mariage", description: "Nous adaptons le service selon vos attentes.", features: ["Service continu", "Présentation soignée", "Menu personnalisé"] },
                        { icon: Users, title: "Fêtes d'Entreprise", description: "Du cocktail au dessert, en passant par les plats.", features: ["Service sur site", "Options variées", "Desserts inclus"] },
                        { icon: Cake, title: "Événement privé", description: "Cousinade, Baptême, Anniversaire", features: ["Ambiance conviviale", "Adapté à tous les âges", "Grand choix de plats"] }
                    ].map(({ icon: Icon, title, description, features }, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-[#fffd67] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Icon className="w-8 h-8 text-red-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-red-600 text-center mb-4">{title}</h4>
                            <p className="text-gray-700 text-center mb-6">{description}</p>
                            <ul className="space-y-2">
                                {features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-[#fffd67] rounded-full"></div>
                                        <span className="text-sm text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold text-red-600 text-center mb-12">Demander un devis</h3>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h4 className="text-xl font-semibold text-red-600 mb-6">Comment nous contacter ?</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-[#fffd67]" />
                                    <div>
                                        <p className="font-semibold">Appelez-nous</p>
                                        <p className="text-sm text-gray-600">06 11 52 16 89</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-[#fffd67]" />
                                    <div>
                                        <p className="font-semibold">Écrivez-nous</p>
                                        <p className="text-sm text-gray-600">fritesbonnel@gmail.com
                                            / accueil.fritesbonnel@gmail.com
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-5 h-5 text-[#fffd67]" />
                                    <div>
                                        <p className="font-semibold">Rencontrez-nous</p>
                                        <p className="text-sm text-gray-600">Sur rendez-vous à Angers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quote Form */}
                        <div>
                            <h4 className="text-xl font-semibold text-red-600 mb-6">Devis</h4>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {submitError && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">Erreur !</strong>
                                        <span className="block sm:inline"> {submitError}</span>
                                    </div>
                                )}
                                
                                {/* Input fields */}
                                {/* Nom et Prénom séparés */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <input type="text" name="event_client_lastname" placeholder="Nom *" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/>
                                    </div>
                                    <div>
                                        <input type="text" name="event_client_firstname" placeholder="Prénom *" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/>
                                    </div>
                                </div>

                                <div className="mb-4"><input type="email" name="event_client_email" placeholder="Votre email *" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/></div>
                                <div className="mb-4"><input type="text" name="event_client_phone" placeholder="Votre numéro de téléphone *" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/></div>
                                
                                {/* SELECTEUR TYPE D'EVENEMENT (Avec onChange) */}
                                <div className="mb-4">
                                    <select 
                                        name="event_type" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                        required
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option value="">Type d'événement *</option>
                                        <option value="Mariage">Mariage</option>
                                        <option value="Lendemain de mariage">Le lendemain du mariage</option>
                                        <option value="Fete d'entreprise">Fête d'entreprise</option>
                                        <option value="Evenement prive">Événement privé</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>

                                {/* CHAMP CONDITIONNEL : Nom de l'entreprise */}
                                {eventType === "Fete d'entreprise" && (
                                    <div className="mb-4">
                                        <input 
                                            type="text" 
                                            name="company_name" 
                                            placeholder="Nom de l'entreprise *" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                            required
                                        />
                                    </div>
                                )}

                                {/* Date de l'événement */}
                                <div className="mb-4">
                                    <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">Date de l'événement *</label>
                                    <input type="date" name="event_date" id="event_date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/>
                                </div>

                                {/* ADRESSE DE L'EVENEMENT */}
                                <div className="mb-4">
                                    <textarea 
                                        name="adresse_evenement" 
                                        placeholder="Adresse de l'événement *" 
                                        rows={2} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                        required
                                    ></textarea>
                                </div>

                                {/* MODIFICATION : Début de service uniquement (Type Time) */}
                                <div className="mb-4">
                                    <label htmlFor="heure_debut_service" className="block text-sm font-medium text-gray-700 mb-1">
                                        Début de service souhaité *
                                    </label>
                                    <input 
                                        type="time" 
                                        name="heure_debut_service" 
                                        id="heure_debut_service" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                                        required
                                    />
                                </div>


                                <div className="mb-4"><input type="number" name="nombre_convives" placeholder="Nombre de convives *" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required/></div>
                                <div className="mb-4">
                                    <select name="repas_souhaite" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
                                        <option value="" disabled selected>Repas souhaité *</option>
                                        <option value="burger_frites">Burger + Frites</option>
                                        <option value="hotdog_frites">Hot-dog + Frites</option>
                                        <option value="americain_frites">Américain (sandwich saucisse ou merguez) + Frites</option>
                                        <option value="autre_repas">Autre (préciser dans la description)</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <textarea name="adresse_facturation" placeholder="Adresse de facturation complète*" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required></textarea>
                                </div>
                                <div>
                                    <textarea name="event_description" placeholder="Décrivez votre projet..." rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full bg-[#fffd67] text-red-600 py-3 rounded-lg font-semibold hover:bg-[#fefc4c] transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                    <span>{loading ? "Envoi en cours..." : "Demander un devis "}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popup de confirmation */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-bounce">
                        <h3 className="text-2xl font-bold text-red-600 mb-2">
                            Merci pour votre demande !
                        </h3>
                        <p className="text-gray-700">
                            Votre demande de devis a bien été envoyée.
                            Nous reviendrons vers vous très vite !
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EvenementsPage;