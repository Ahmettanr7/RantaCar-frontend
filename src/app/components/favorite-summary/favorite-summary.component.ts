import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { FavoriteItem } from 'src/app/models/favoriteItem';
import { CarService } from 'src/app/services/car.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-favorite-summary',
  templateUrl: './favorite-summary.component.html',
  styleUrls: ['./favorite-summary.component.css']
})
export class FavoriteSummaryComponent implements OnInit {

  favoriteItems:FavoriteItem[]=[]

  constructor(
    private favoriteService:FavoriteService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getFavorite();
  }

  getFavorite(){
    this.favoriteItems = this.favoriteService.list();
  }

  removeFromFavorite(car:Car){
    this.favoriteService.removeFromFavorite(car);
    this.toastrService.info(car.brandName+" " +car.carName + " favorilerinizden kaldırıldı", "Kaldırıldı")
  }

}
