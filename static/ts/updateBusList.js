"use strict";
/// <reference path="./socket-io-client.d.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const updateBusListSocket = window.io('/updateBusList');
function getBusList() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch("/busList");
        let busList = yield res.json();
        console.log(busList);
        return busList;
    });
}
let busListPromise = getBusList();
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let busList = yield busListPromise;
        console.log(busList);
    });
}
test();
//# sourceMappingURL=updateBusList.js.map