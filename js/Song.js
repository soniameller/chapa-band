class Song {
  constructor(trackId, speed = 1) {
    this.notes = songs[trackId].notes;
    this.startTime = undefined;
    this.pauseTime = undefined;
    this.speed = speed;
    this.pulse = songs[trackId].pulse;
    this.track = songs[trackId].audio;
    this.track.playbackRate = speed;
    this.timeToPlay = true;
    this.notesToPress = [];
    this.feedbacks = [];
  }

  draw(ctx) {
    // Stop the function if no startTime
    if (!this.startTime) {
      return;
    }

    ctx.save();

    let time = this.speed * (Date.now() - this.startTime);

    if (this.pauseTime) {
      time = this.speed * (this.pauseTime - this.startTime);
    }

    //------DRAW NOTES-------
    // console.log(time);
    this.timeToPlay = false;
    this.notesToPress = [];
    for (const key in this.notes) {
      let noteTime = key * ((4 * 60000) / this.pulse); // In our case, we consider that "1" => 4 (beats por compas) * 60.000(milisegundos)/ 115 (pulse --> BPM)
      let notes = this.notes[key].split(",");

      if (Math.abs(noteTime - time) < 60) {
        ctx.fillStyle = "#926014";
        this.timeToPlay = true;
        this.notesToPress.push(notes);
      } else {
        ctx.fillStyle = "black";
      }

      ctx.font = "25px Arial";
      ctx.textAlign = "center";

      for (let i = 0; i < notes.length; i++) {
        let y = 36;
        if (notes[i] === "BD") y = 140;
        if (notes[i] === "S") y = 78;
        ctx.fillText(notes[i], SPEED * (noteTime - time) + 154, y);
      }
    }

    // ------DRAW FEEDBACKS-----
    for (let i = 0; i < this.feedbacks.length; i++) {
      let x = 153;
      let y = this.feedbacks[i].y;
      let radius = 20;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = this.feedbacks[i].color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // ----- DRAW END OF GAME------

    // if (this.track.currentTime === this.track.duration ) {
    //   let img = new Image();
    //   img.src = "/img/endOfSong.png";
    //   ctx.drawImage(img, 0, 0);

    //   setTimeout(() => {
    //     location.reload();
    //   }, 15000);
    // }

    ctx.restore();
  }


  update() {
    for (let i = 0; i < this.feedbacks.length; i++) {
      this.feedbacks[i].ttl--;
      if (this.feedbacks[i].ttl === 0) {
        this.feedbacks.splice(i, 1);
      }
    }
  }
  play() {
    this.startTime = Date.now();
    if (!this.track.paused) {
      this.track.currentTime = 0;
      this.track.pause();
    }

    setTimeout(() => {
      this.track.playbackRate = this.speed;
      this.track.play();
    }, 2000 / this.speed);
  }

  pause() {
    if (this.track.paused) {
      this.track.play();
      this.startTime += Date.now() - this.pauseTime;
      this.pauseTime = undefined;
    } else {
      this.track.pause();
      this.pauseTime = Date.now();
    }
  }
  hit(note) {
    let feedbackColor;
    let feedbackY;

    if (this.track.currentTime !== 0) {
      if (this.notesToPress.toString().includes(note)) {
        score += 10;
        feedbackColor = "green";
      } else {
        score -= 20;
        feedbackColor = "red";
      }
    }

    if (note === "xH") feedbackY = 30;
    else if (note === "S") feedbackY = 50;
    else if (note === "CC") feedbackY = 70;
    else feedbackY = 120;

    this.feedbacks.push({
      y: feedbackY,
      ttl: 10,
      color: feedbackColor
    });
  }
}
