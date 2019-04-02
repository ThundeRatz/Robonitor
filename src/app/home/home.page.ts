import { Component, ViewChild, ElementRef } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import anime from "animejs";
import scale from "scale-that-svg";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  strategyBtnAnimation: anime.AnimeInstance;
  monitracerBtnAnimation: anime.AnimeInstance;

  tracersvg: SafeHtml;
  strategiessvg: SafeHtml;

  @ViewChild("container") mainContainer: ElementRef;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  async ionViewDidEnter() {
    await this.initializeStrategiesButton();
    await this.initializeMonitracerButton();
  }

  async initializeStrategiesButton() {
    let baseWidth: number = 320;
    let baseHeight: number = 320;
    let _scale: number = 0.5;

    let scaled = await scale(
      `<svg width="${baseWidth * _scale}" height="${baseHeight * _scale}" viewBox="0 0 320 320">
        <circle fill="none" stroke="#FFF" stroke-width="6" cx="160" cy="160" r="150" />
        <path id="dojo" fill="none" stroke="none" d="M 165.29834,309.16708 64.511245,13.489357 314.56445,200.72942 10.755681,193.43446 252.24753,17.980357 Z" />
      </svg>`,
      { scale: _scale }
    );

    this.strategiessvg = this.sanitizer.bypassSecurityTrustHtml(scaled);
    await sleep(10);

    let path = anime.path("#dojo");

    this.strategyBtnAnimation = anime({
      targets: "#strategies-bot",
      translateX: path("x"),
      translateY: path("y"),
      rotate: path("angle"),
      duration: 1500,
      loop: false,
      easing: "easeInOutQuad",
      autoplay: false,

      complete: () => {
        this.router.navigate(["/strategies"]);
      },
    });
  }

  async initializeMonitracerButton() {
    let baseWidth: number = 187;
    let baseHeight: number = 94;

    let newWidth: number = this.mainContainer.nativeElement.offsetWidth * 0.6;
    let _scale: number = newWidth / baseWidth;

    let scaled = await scale(
      `<svg width="${baseWidth * _scale}" height="${baseHeight * _scale}" viewBox="0 0 187 94">
        <path
          id="inf-path"
          fill="none"
          stroke="#FFF"
          stroke-width="2"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4 17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>`,
      { scale: _scale }
    );

    this.tracersvg = this.sanitizer.bypassSecurityTrustHtml(scaled);
    await sleep(10);

    let path2 = anime.path("#inf-path");

    this.monitracerBtnAnimation = anime({
      targets: "#monitracer-bot",
      translateX: path2("x"),
      translateY: path2("y"),
      rotate: path2("angle"),
      duration: 2000,
      loop: false,
      easing: "easeInOutQuad",
      autoplay: false,

      complete: () => {
        this.router.navigate(["/monitracer"]);
      },
    });
  }

  strategies(): void {
    if (anime.running.length > 0) {
      return;
    }

    this.strategyBtnAnimation.play();
  }

  monitracer(): void {
    if (anime.running.length > 0) {
      return;
    }

    this.monitracerBtnAnimation.play();
  }
}
