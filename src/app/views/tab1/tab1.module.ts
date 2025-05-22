import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MapaComponent } from 'src/app/components/mapa/mapa/mapa.component';
import { MenuFlutuanteComponent } from 'src/app/components/menu-flutuante/menu-flutuante.component'

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MapaComponent,
    MenuFlutuanteComponent
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
