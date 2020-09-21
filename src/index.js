/*
 * @Author: shichuyu
 * @Date: 2020-09-21 17:06:44
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-09-21 19:03:46
 * @Description: 
 */
// import './index.less';
import './index.scss';
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');
console.log('aaa');
