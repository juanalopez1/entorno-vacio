import {
  Component,
  effect,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import {
  IonHeader,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonSelectOption,
  IonText,
  IonSelect,
  IonInput,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LocalityService } from 'src/app/services/locality.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonInput,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    FormsModule,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
  ],
})
export class HomePage implements OnInit {
  public name = signal<string>('');
  public surname = signal<string>('');
  public city = signal<string>('');
  public locality = linkedSignal(() => this.values()[0].name);
  private userService = inject(UserService);
  private localityService = inject(LocalityService);

  ngOnInit(): void {
    const ws = new WebSocket('ws://localhost:3000/');
    ws.addEventListener('message', (event) => {
      console.log(event.data);
    });
  }

  public values = signal<any[]>([]);

  public localities = resource({
    loader: async () => {
      const res = await this.localityService.getAll(this.city());
      console.log('Respuesta getAll:', res);
      return res;
    },
  });

  public messageResult = signal<string>('');

  reload() {
    this.localities.reload();
    const valuesArray = Object.values(this.localities.value()!);
    this.values.set(valuesArray);
  }

  async onSubmit() {
    try {
      console.log(this.localities.value());
      const response = await this.userService.create(
        this.name(),
        this.surname(),
        this.city(),
        this.locality().toLowerCase()
      );
      const { user, message } = response as {
        user: { name: string; surname: string; city: string; locality: string };
        message: string;
      };
      this.messageResult.set(message);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.error('Error al crear', e.error.message);
        this.messageResult.set('Error al crear. ' + e.error.message);
      }
    }
  }

  constructor() {}
}
