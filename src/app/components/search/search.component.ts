import { Component, OnInit } from '@angular/core';

// Service import demo:
import { StorageService } from '../../services/storage.service';

// way 1: (not recommended)
// let storage = new StorageService;
// console.log(storage)

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public keyword: string = '';
  public newList: any[] = [];

  // way 2: (angular official)
  constructor(public storage: StorageService) {
    // Inside constructor() parameter, declare an data/attribute named storage.
    // storage value equal to imported StorageService.
    // StorageService is a user-created service instance.
    // console.log(this.storage.get())
  }


  ngOnInit() {
    // localStorage 储存数据
    // 2. 每次页面刷新, ngOnIt 会自动判断其中数据
    // ngOnInit() is a Life cycle function, like React componentDidMount().
    let localList = this.storage.get('localList');
    // 3. 如果 localStorage 不为空, 则使用 LocalStorage 的数据.
    if (localList) {
      this.newList = localList;
    }
  }

  searchItem() {
    if (this.keyword.length > 0 && this.newList.indexOf(this.keyword) == -1) {
      this.newList.push(this.keyword);
      this.keyword = '';
      console.log(this.keyword)
      console.log(this.newList)

      // localStorage 储存数据
      // 1. set localStorage 的 key(是'localList') 和 value(是this.newList):
      // see services/storage.service.ts
      // this.storage.set('localList', this.newList) 必须放在 this.newList.push(this.keyword) 后面.
      this.storage.set('localList', this.newList)
    }
    else {
      alert('Check your item')
    }
  }

  deleItem(key) {
    this.newList.splice(key, 1) //from 'key' position, delete one item.

    // localStorage 储存数据
    // 4. 当删除时, 再 set localStorage 一遍:
    this.storage.set('localList', this.newList)
  }

}
