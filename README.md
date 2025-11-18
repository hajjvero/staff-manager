# 🏢 Gestion Interactive des Employés — Floor Plan Manager (Front-End)

## 📖 Contexte du projet
Ce projet consiste à concevoir et développer une **application web interactive** permettant de **gérer, organiser et visualiser les employés** d’une entreprise directement sur un **plan d’étage dynamique**.  
L’utilisateur peut **ajouter, déplacer, affecter ou retirer** des employés selon des **règles métier strictes**, tout en bénéficiant d’une interface **responsive**, moderne et intuitive.

L’objectif principal est d’offrir :
- Une gestion centralisée du personnel
- Une visualisation claire et interactive
- Une interface fluide et accessible
- Une application en **JavaScript Vanilla + HTML + CSS/Sass**

---

## 🚀 Fonctionnalités clés

### 1. 🔧 Gestion des employés
- Ajout d’un employé via une modale (nom, rôle, email, téléphone, photo, expériences).
- Génération d’un **UUID unique** pour chaque employé.
- Prévisualisation instantanée de la photo.
- Modification et suppression depuis *Unassigned Staff*.

### 2. 🗺 Affichage du plan d’étage
Le plan comprend **6 zones** :
- Salle de conférence
- Réception
- Salle des serveurs
- Salle de sécurité
- Salle du personnel
- Salle d’archives

Chaque zone possède un bouton **"+"** pour ajouter un employé.

### 3. 🔒 Règles métier
- Réception → Réceptionnistes uniquement
- Salle des serveurs → Techniciens IT
- Salle de sécurité → Agents de sécurité
- Managers → accès complet
- Nettoyage → partout sauf Salle d’archives
- Autres → accès aux zones non restreintes

### 4. ↩ Retrait & réorganisation
- Chaque employé placé peut être retiré via un bouton **"X"**.
- L’employé retourne dans *Unassigned Staff*.

### 5. 👁 Profil détaillé
La fiche profil affiche :
- Photo grand format
- Nom, rôle
- Email & Téléphone
- Expériences
- Localisation actuelle

### 6. 🎨 UI Responsive & Animations
- Layout en **Flexbox + CSS Grid**
- Compatibilité mobile / tablette / desktop
- Zones vides visibles en rouge pâle
- Animations fluides via :
    - **CSS Transitions**
    - **Animate.css**
    - **Hover.css**
    - **Animations personnalisées via Sass**

### 7. 💾 Sauvegarde locale
- Sauvegarde automatique via **LocalStorage**.

### 8. 🖱 Drag & Drop (Bonus)
- Déplacement d’employés entre zones via **Drag & Drop natif**.

---

## 🧠 User Stories

### Gestion intuitive
> En tant qu’utilisateur, je veux organiser les employés facilement via une interface claire.

### Règles d’accès
> En tant qu’entreprise, je veux éviter l’affectation d’un employé dans une zone interdite.

### Ajout / Modification
> En tant qu’administrateur, je veux ajouter ou modifier les employés rapidement.

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
| **Langages** | HTML5, CSS3, Sass, JavaScript Vanilla |
| **Styling** | Sass (architecture modulaire SCSS) |
| **Layout** | Flexbox, CSS Grid |
| **UI** | JavaScript natif |
| **Animations** | CSS Transitions, Animate.css, Hover.css |
| **Génération d’ID** | UUID v4 |
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

## 🔀 Stratégie de branches Git (Git Workflow)

### 🔹 1. Branche principale
- **main**  
  Version stable et prête à être déployée.

### 🔹 2. Branche de développement
- **develop**  
  Intègre les nouvelles fonctionnalités avant merger dans main.

### 🔹 3. Branches de fonctionnalités
Convention : feat/`fonctionnalité`

Exemples :
- `feat/add-employee-modal`
- `feat/drag-and-drop`
- `feat/profile-view`

