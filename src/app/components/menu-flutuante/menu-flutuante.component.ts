import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-flutuante',
  templateUrl: './menu-flutuante.component.html',
  styleUrls: ['./menu-flutuante.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MenuFlutuanteComponent {
  mostrarMenu = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  navegar(caminho: string) {
    this.router.navigate([caminho]);
    this.mostrarMenu = false;
  }
}
