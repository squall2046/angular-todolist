import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public keyword: string = '';
  public newList: any[] = [];



  constructor() { }

  ngOnInit() {
  }

  searchItem() {

    if (this.keyword.length >0 && this.newList.indexOf(this.keyword) == -1) {
      this.newList.push(this.keyword);
      this.keyword = '';

      console.log(this.keyword)
      console.log(this.newList)
    }
    else{
      alert('Check your item')
    }

  }

  deleItem(key) {
    this.newList.splice(key, 1) //from 'key' position, delete one item.
  }

}
