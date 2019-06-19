class Song {
  constructor(trackId, speed = 0.5) {
    this.notes = songs[trackId].notes;
    this.startTime = undefined;
    this.pauseTime = undefined;
    this.speed = speed;
    this.pulse = songs[trackId].pulse;
    this.track = songs[trackId].audio;
    this.track.playbackRate = speed;
    this.timeToPlay = true;
    this.notesToPress = [];
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
    ctx.restore();
  }
  play() {
    this.startTime = Date.now();
    if (!this.track.paused) {
      this.track.currentTime = 0;
      this.track.pause();
    }

    setTimeout(() => {
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
    if (this.track.currentTime !== 0) {
      if (this.notesToPress.toString().includes(note) === true)score += 10;
      if (this.notesToPress.toString().includes(note) === false) score -= 20;
    }
  }
}
