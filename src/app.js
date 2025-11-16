import "../node_modules/bootstrap/dist/js/bootstrap.js";

import StorageService from './services/StorageService.js';
import AppController from './controllers/AppController.js';
import planSaad from './data/seed.js';


// Charger données
const saved = StorageService.load();

// Initialiser l'application
const app = new AppController(saved || planSaad);

// Lancer l'application
app.init();