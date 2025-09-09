const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let serverProcess;

function createWindow() {
  // Ana pencereyi oluştur
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, 'attached_assets/enteresan_1756933510623.jpeg'),
    title: 'Enstrümanları Tanıyorum',
    show: false // Başlangıçta gizli
  });

  // Splash screen göster
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Server başlat
  startServer();
  
  // Server başladıktan sonra sayfayı yükle
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:5000');
  }, 3000);
}

function startServer() {
  // Node.js server'ı başlat
  const serverScript = path.join(__dirname, 'server', 'index.js');
  
  serverProcess = spawn('node', [serverScript], {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'inherit'
  });

  serverProcess.on('error', (err) => {
    console.error('Server başlatma hatası:', err);
  });
}

// App hazır olduğunda pencereyi oluştur
app.whenReady().then(createWindow);

// Tüm pencereler kapatıldığında uygulamayı kapat (Windows & Linux)
app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Uygulama kapatıldığında server'ı da kapat
app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});