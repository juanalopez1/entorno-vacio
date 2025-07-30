import { Component, inject, OnInit, resource } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IonContent, IonGrid, IonRow, IonCard, IonCol, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.pages.html',
  styleUrls: ['./listado.pages.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCard, IonCol, IonCardContent, IonCardHeader, IonCardTitle],
})
export class ListadoPages implements OnInit {
  private readonly userSrvice = inject(UserService);
  constructor() {}
  public users = resource({
    loader: async () => {
      const res = await this.userSrvice.getAll();
      console.log('Respuesta getAll:', res);
      return res;
    },
  });
  ngOnInit() {
    this.users.value()
  }
}
