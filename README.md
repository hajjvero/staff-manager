# 🏢 Gestion Interactive des Employés — Floor Plan Manager (Front-End)

## 📖 Contexte du projet
Ce projet consiste à concevoir et développer une **application web interactive** permettant de **gérer, organiser et visualiser les employés** d’une entreprise directement sur un **plan d’étage dynamique**.  
L’utilisateur peut **ajouter, déplacer, affecter ou retirer** des employés selon des **règles métier strictes**, tout en bénéficiant d’une interface **responsive**, moderne et intuitive.

L’objectif principal est d’offrir :
- Une gestion centralisée du personnel
- Une visualisation claire et interactive des postes occupés
- Une interface fluide, accessible et moderne
- Une application en **JavaScript Vanilla + HTML + CSS**

---

## 🚀 Fonctionnalités clés

### 1. 🔧 Gestion des employés
- Ajout d’un employé via une modale (nom, rôle, email, téléphone, photo, expériences).
- Prévisualisation instantanée de la photo.
- Modification (optionnel) et suppression depuis la liste *Unassigned Staff*.

### 2. 🗺 Affichage du plan d’étage
Le plan comprend **6 zones** :
- Salle de conférence
- Réception
- Salle des serveurs
- Salle de sécurité
- Salle du personnel
- Salle d’archives

Chaque zone inclut un bouton **"+"** pour y affecter un employé.

### 3. 🔒 Règles métier
- Réception → Réceptionnistes uniquement
- Salle des serveurs → Techniciens IT
- Salle de sécurité → Agents de sécurité
- Managers → accès complet
- Nettoyage → partout sauf Salle d’archives
- Autres → accès aux zones non restreintes

### 4. ↩ Retrait et réorganisation
- Chaque employé placé peut être retiré via un bouton **"X"**.
- L’employé retourne dans *Unassigned Staff*.

### 5. 👁 Profil détaillé
La fiche profil affiche :
- Photo grand format
- Nom
- Rôle
- Email & Téléphone
- Expériences
- Localisation actuelle

### 6. 🎨 Interface responsive & animations
- Layout en **Flexbox + CSS Grid**
- Compatible mobile, tablette, PC
- Zones vides obligatoires visibles en rouge pâle
- Animations CSS fluides

### 7. 💾 Sauvegarde locale (Bonus)
- Sauvegarde automatique de l’état du plan via **LocalStorage**.

### 8. 🖱 Drag & Drop (Bonus)
- Déplacement des employés entre zones par glisser-déposer.

---

## 🧠 User Stories

### Gestion intuitive
> En tant qu’utilisateur, je veux organiser les employés facilement via une interface claire.

### Règles d’accès
> En tant qu’entreprise, je veux éviter l’affectation d’un employé dans une zone interdite.

### Ajout / Modification
> En tant qu’administrateur, je veux ajouter, éditer ou supprimer des employés rapidement.

### Profil détaillé
> Je veux accéder à toutes les informations d’un employé via une fiche dédiée.

### Responsive
> L’application doit fonctionner sur tous les appareils.

### Sauvegarde
> L’état du plan doit être enregistré automatiquement.

### Drag & Drop
> Je veux réorganiser les employés en les glissant-déposant.

---

## 🧰 Technologies utilisées

| Catégorie | Technologie |
|----------|-------------|
| **Langages** | HTML5, CSS3, JavaScript (Vanilla) |
| **Layout** | Flexbox, CSS Grid |
| **UI / Modales** | JavaScript natif |
| **Animations** | CSS Transitions |
| **Stockage** | LocalStorage |
| **Validation** | W3C Validator |
| **Versioning** | Git / GitHub |
| **Hébergement** | GitHub Pages / Vercel |

---

## 📱 Responsive — Tailles prises en charge

| Appareil | Largeur |
|----------|----------|
| Grand écran PC | > 1280px |
| Petit écran PC | 1024–1279px |
| Tablette | 768–1023px |
| Mobile portrait | < 767px |
| Mobile paysage | 768–1023px |

---

## 📈 Critères de performance

- Navigation fluide et sans latence
- Mise à jour instantanée des zones
- Validation du code HTML/CSS (W3C)
- Responsive complet
- Sauvegarde fiable dans LocalStorage
- Code JS léger et optimisé

---

## 🧾 Auteur

**👤 Hamza Hajjaji**  
📅 *Projet réalisé dans le cadre d’un brief pédagogique — Novembre 2025*  
🔗 GitHub : https://github.com/hajjvero

