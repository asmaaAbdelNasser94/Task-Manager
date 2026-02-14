import{c as K,d as L,e as h,f as C}from"./chunk-MGBFVBOF.js";import{Y as $,na as z,oa as U,pa as G,qa as v,wa as J}from"./chunk-TIWP5BAE.js";import{$a as y,Ca as j,Da as N,Ea as p,K as T,L as B,N as F,P as g,Sa as i,Ta as f,Ua as u,Za as I,_a as S,ac as O,ca as R,cc as H,db as _,dc as P,eb as Q,fb as b,ga as E,gb as w,ib as c,jb as d,mc as V,oa as o,qb as A,rb as m,sb as M,tb as x,ya as D,za as k,zb as q}from"./chunk-GPF36W6L.js";var W=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`;var te=["header"],ne=["title"],ie=["subtitle"],ae=["content"],oe=["footer"],re=["*",[["p-header"]],[["p-footer"]]],le=["*","p-header","p-footer"];function pe(t,l){t&1&&y(0)}function ce(t,l){if(t&1&&(f(0,"div",1),b(1,1),p(2,pe,1,0,"ng-container",2),u()),t&2){let e=_();m(e.cx("header")),i("pBind",e.ptm("header")),o(2),i("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function de(t,l){if(t&1&&(I(0),M(1),S()),t&2){let e=_(2);o(),x(e.header)}}function se(t,l){t&1&&y(0)}function me(t,l){if(t&1&&(f(0,"div",1),p(1,de,2,1,"ng-container",3)(2,se,1,0,"ng-container",2),u()),t&2){let e=_();m(e.cx("title")),i("pBind",e.ptm("title")),o(),i("ngIf",e.header&&!e._titleTemplate&&!e.titleTemplate),o(),i("ngTemplateOutlet",e.titleTemplate||e._titleTemplate)}}function fe(t,l){if(t&1&&(I(0),M(1),S()),t&2){let e=_(2);o(),x(e.subheader)}}function ue(t,l){t&1&&y(0)}function _e(t,l){if(t&1&&(f(0,"div",1),p(1,fe,2,1,"ng-container",3)(2,ue,1,0,"ng-container",2),u()),t&2){let e=_();m(e.cx("subtitle")),i("pBind",e.ptm("subtitle")),o(),i("ngIf",e.subheader&&!e._subtitleTemplate&&!e.subtitleTemplate),o(),i("ngTemplateOutlet",e.subtitleTemplate||e._subtitleTemplate)}}function ye(t,l){t&1&&y(0)}function he(t,l){t&1&&y(0)}function Te(t,l){if(t&1&&(f(0,"div",1),b(1,2),p(2,he,1,0,"ng-container",2),u()),t&2){let e=_();m(e.cx("footer")),i("pBind",e.ptm("footer")),o(2),i("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var ge=`
    ${W}

    .p-card {
        display: block;
    }
`,be={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},X=(()=>{class t extends J{name="card";style=ge;classes=be;static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var Y=new F("CARD_INSTANCE"),ve=(()=>{class t extends L{componentName="Card";$pcCard=g(Y,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(h,{self:!0});_componentStyle=g(X);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}header;subheader;set style(e){$(this._style(),e)||(this._style.set(e),this.el?.nativeElement&&e&&Object.keys(e).forEach(r=>{this.el.nativeElement.style[r]=e[r]}))}get style(){return this._style()}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=R(null);getBlockableElement(){return this.el.nativeElement}templates;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"title":this._titleTemplate=e.template;break;case"subtitle":this._subtitleTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(t)))(n||t)}})();static \u0275cmp=D({type:t,selectors:[["p-card"]],contentQueries:function(r,n,s){if(r&1&&w(s,z,5)(s,U,5)(s,te,4)(s,ne,4)(s,ie,4)(s,ae,4)(s,oe,4)(s,G,4),r&2){let a;c(a=d())&&(n.headerFacet=a.first),c(a=d())&&(n.footerFacet=a.first),c(a=d())&&(n.headerTemplate=a.first),c(a=d())&&(n.titleTemplate=a.first),c(a=d())&&(n.subtitleTemplate=a.first),c(a=d())&&(n.contentTemplate=a.first),c(a=d())&&(n.footerTemplate=a.first),c(a=d())&&(n.templates=a)}},hostVars:4,hostBindings:function(r,n){r&2&&(A(n._style()),m(n.cn(n.cx("root"),n.styleClass)))},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[q([X,{provide:Y,useExisting:t},{provide:K,useExisting:t}]),j([h]),N],ngContentSelectors:le,decls:8,vars:11,consts:[[3,"pBind","class",4,"ngIf"],[3,"pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"]],template:function(r,n){r&1&&(Q(re),p(0,ce,3,4,"div",0),f(1,"div",1),p(2,me,3,5,"div",0)(3,_e,3,5,"div",0),f(4,"div",1),b(5),p(6,ye,1,0,"ng-container",2),u(),p(7,Te,3,4,"div",0),u()),r&2&&(i("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),o(),m(n.cx("body")),i("pBind",n.ptm("body")),o(),i("ngIf",n.header||n.titleTemplate||n._titleTemplate),o(),i("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),o(),m(n.cx("content")),i("pBind",n.ptm("content")),o(2),i("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),o(),i("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[P,O,H,v,C,h],encapsulation:2,changeDetection:0})}return t})(),Ve=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=k({type:t});static \u0275inj=B({imports:[ve,v,C,v,C]})}return t})();var Ce="assets/data/statistics.json",Z=class t{statisticsResource=V(()=>Ce);static \u0275fac=function(e){return new(e||t)};static \u0275prov=T({token:t,factory:t.\u0275fac,providedIn:"root"})};export{ve as a,Ve as b,Z as c};
