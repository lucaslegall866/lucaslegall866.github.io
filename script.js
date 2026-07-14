// Affiche l'année en cours automatiquement dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Défilement doux quand on clique sur un lien de la navigation
document.querySelectorAll('nav a').forEach(function (lien) {
  lien.addEventListener('click', function (e) {
    e.preventDefault();
    const cible = document.querySelector(this.getAttribute('href'));
    if (cible) {
      cible.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== WAVESURFER : transforme chaque .wave en forme d'onde =====
document.querySelectorAll('.wave').forEach(function (element) {
  // Crée une waveform pour cet élément
  const ws = WaveSurfer.create({
    container: element,
    url: element.dataset.audio,     // le fichier indiqué dans data-audio
    waveColor: '#4a4f5a',           // couleur de l'onde au repos
    progressColor: '#e04040',       // couleur de la partie jouée (ton accent)
    height: 60,
    barWidth: 2,
    barGap: 1,
    cursorWidth: 0
  });

  // Trouve le bouton play associé à cette waveform
  const bouton = document.querySelector('[data-cible="' + element.id + '"]');
  bouton.addEventListener('click', function () {
    ws.playPause();
  });

  // Met à jour le bouton selon l'état (play / pause)
  ws.on('play', function () { bouton.textContent = '❚❚'; });
  ws.on('pause', function () { bouton.textContent = '▶'; });
  ws.on('finish', function () { bouton.textContent = '▶'; });
});