import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart.service';
import { Food3Service } from 'src/app/services/food3.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.page.html',
  styleUrls: ['./detail3.page.scss'],
})
export class Detail3Page implements OnInit {
  id: number;
  food: Food;
  private qtyNum = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private food3Service: Food3Service,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private modalController: ModalController,
    private _authService : AuthService,
    private route : Router,
    private alertCtrl: AlertController,
  ) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.food = this.food3Service.getFood(this.id);
  }

  addItemToCart() {
    if(this._authService.IsLoggedIn()){
      const cartitem: CartItem = {
        id: this.food.id,
        name: this.food.title,
        price: this.food.price,
        image: this.food.image,
        quantity: 1,
      };
      this.cartService.addToCart(cartitem);
      this.presentToast();     
    }else{
      this.error('Log in First');
      
    } 
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item added to the cart',
      mode: 'ios',
      duration: 1000,
      position: 'bottom',
    });

    toast.present();
  }

  closeModal(){
    this.modalController.dismiss();
  }
  addVal(){
    this.qtyNum++;
  }
  delVal(){
    this.qtyNum--;
  }
  async error(a) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: a,
      buttons: [
        {
          text: 'Ok',
          handler : ()=>{
            this.route.navigateByUrl('/login').then(()=>{
              location.reload();
            }) 
          } 
        },
      ],
    });
  
    alert.present();
  }
}
