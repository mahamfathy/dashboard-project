import{a as g}from"./chunk-S4DCJUMT.js";import{c as u}from"./chunk-L4HXEMRN.js";import{d as s}from"./chunk-COQU7ES4.js";import{ba as r,ga as a,o as n}from"./chunk-3S6DEF7O.js";var o=(()=>{class e{constructor(t){this.translateService=t}setDefaultLanguage(t){this.translateService.setDefaultLang(t)}use(t){return this.translateService.use(t)}static{this.\u0275fac=function(i){return new(i||e)(a(u))}}static{this.\u0275prov=r({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var d=(()=>{class e{constructor(t,i,c){this.translationService=t,this.localStorageService=i,this.document=c,this.languageKey="lang",this.defaultLanguageKey="ar",this.languageChange=new n(this.defaultLanguageKey),this.html=this.document.getElementsByTagName("html")[0],this.currentLanguage=localStorage.getItem(this.languageKey)||this.defaultLanguageKey,this.languageChange.next(this.currentLanguage)}initAppLanguage(){this.translationService.setDefaultLanguage(this.currentLanguage),this.updateLayout()}changeLanguage(t){t!==this.currentLanguage&&(this.setLanguage(t),this.languageChange.next(t))}setLanguage(t){this.currentLanguage=t,this.localStorageService.setItem(this.languageKey,t),this.translationService.use(t),this.updateLayout()}updateLayout(){this.html.lang=this.currentLanguage,this.document.body.dir=this.getDirection()}getDirection(){return this.currentLanguage===this.defaultLanguageKey?"rtl":"ltr"}getCurrentLanguage(){return this.currentLanguage}static{this.\u0275fac=function(i){return new(i||e)(a(o),a(g),a(s))}}static{this.\u0275prov=r({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{d as a};
