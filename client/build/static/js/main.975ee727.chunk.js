(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,a,t){e.exports=t(61)},35:function(e,a,t){},60:function(e,a,t){},61:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),i=t(12),s=t.n(i),c=(t(35),t(2)),r=t(6),o=t.n(r),m=t(9),p=t(13),u=function(e,a){return function(t){t({payload:{ship:e,faction:a},type:"LOAD_ONE_SHIP"})}},d=function(e,a){return function(t){t({payload:{ship:e,faction:a},type:"UPDATE_ONE_SHIP"})}},h=Object(c.b)(null,{loadAllShips:function(){return function(){var e=Object(m.a)(o.a.mark((function e(a){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.post("/ships/selected",{faction:"allies",ships:["All"]},{headers:{"Content-Type":"application/json"}});case 2:return t=e.sent,e.next=5,p.post("/ships/selected",{faction:"axis",ships:["All"]},{headers:{"Content-Type":"application/json"}});case 5:n=e.sent,t=t.data,n=n.data,a({payload:{axis:n,allies:t},type:"LOAD_IN_SHIPS"});case 9:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()}})((function(e){var a=e.loadAllShips;return Object(n.useEffect)((function(){console.log("in the use effect"),a()}),[]),l.a.createElement("div",{className:"header"},l.a.createElement("span",{className:"first-half"},l.a.createElement("b",null,"War At Sea")),l.a.createElement("span",{className:"second-half"}," ","List Generator"))})),f=t(3),E=function(e,a){return function(t){t("allies"===e?{payload:a,type:"SET_ALLIES_POINTS"}:{payload:a,type:"SET_AXIS_POINTS"})}},b=Object(c.b)((function(e){return{points:e.points,allShips:e.allShips,userSelection:e.userSelection,alliesPoints:e.factionPoints.allies,axisPoints:e.factionPoints.axis,shipsInPlay:e.shipsInPlay}}),{setPoints:function(e){return function(a){console.log("called"),a({payload:e,type:"SET_POINTS"})}},loadOneShip:u,updateOneShip:d,setFactionPoints:E,removeShips:function(){return function(e){e({payload:{},type:"REMOVE_SHIP"})}}})((function(e){var a=e.setPoints,t=e.allShips,i=e.userSelection,s=e.alliesPoints,c=e.axisPoints,r=e.points,o=e.shipsInPlay,m=e.loadOneShip,p=(e.updateOneShip,e.setFactionPoints),u=e.removeShips,d=Object(n.useState)(""),h=Object(f.a)(d,2),E=h[0],b=h[1];return Object(n.useEffect)((function(){a(E)}),[E]),l.a.createElement("div",{className:"points-wrapper"},l.a.createElement("input",{type:"number",value:E,name:"points",onChange:function(e){return function(e){e&&e.target.value?(b(e.target.value),r=e.target.value):e&&!e.target.value&&(b(""),r=0)}(e)},className:"point-wrapper-placeholder",placeholder:"Point Limit"}),l.a.createElement("button",{className:"RANDOM",onClick:function(e){return function(){var e=0;o.allies.forEach((function(a){if(0==a.locked){var n=t.filter((function(e){return e.name===a.name}));e-=n[0].points,s-=n[0].points}}));var a,n=0;o.axis.forEach((function(e){if(0==e.locked){var a=t.filter((function(a){return a.name===e.name}));n-=a[0].points,c-=a[0].points}})),p("allies",e),p("axis",n),u(),a="All"===i.allies[0]?t.filter((function(e){var a=e.nation;return-1===["Italy","Finland","Japan","Germany","Axis Neutral/Instalations"].indexOf(a)})):t.filter((function(e){return-1!==i.allies.indexOf(e.nation)}));for(var l=0,d=function(){l++;var e=Math.floor(Math.random()*a.length);if(s+a[e].points>r)a.splice(e,1);else{var n=0,i=o.allies.filter((function(t){return t.name==a[e].name}));console.log(o.allies),console.log(a[e].name),console.log(i),i.length>0&&(n=i.length);var c=t.filter((function(t){return t.name==a[e].name}));(c=c[0].number_available)==n?a.splice(e,1):0===n?(m(a[e].name,"allies"),p("allies",a[e].points),s+=a[e].points,o.allies.push({name:a[e].name,secretName:a[e].name+" 0",locked:!1})):(m(a[e].name,"allies"),p("allies",a[e].points),s+=a[e].points,o.allies.push({name:a[e].name,secretName:a[e].name+" ".concat(n),locked:!1}))}};s<r&&a.length>0&&l<10*t.length;)d();a="All"===i.axis[0]?t.filter((function(e){var a=e.nation;return-1!==["Italy","Finland","Japan","Germany","Axis Neutral/Instalations"].indexOf(a)})):t.filter((function(e){return-1!==i.axis.indexOf(e.nation)})),l=0;for(var h=function(){l++;var e=Math.floor(Math.random()*a.length);if(c+a[e].points>r)a.splice(e,1);else{var n=0,i=o.axis.filter((function(t){return t.name==a[e].name}));console.log(o.allies),console.log(a[e].name),console.log(i),i.length>0&&(n=i.length);var s=t.filter((function(t){return t.name==a[e].name}));(s=s[0].number_available)==n?a.splice(e,1):0===n?(m(a[e].name,"axis"),p("axis",a[e].points),c+=a[e].points,o.axis.push({name:a[e].name,secretName:a[e].name+" 0",locked:!1})):(m(a[e].name,"axis"),p("axis",a[e].points),c+=a[e].points,o.axis.push({name:a[e].name,secretName:a[e].name+" ".concat(n),locked:!1}))}};c<r&&a.length>0&&l<10*t.length;)h()}()}},"RANDOM"),l.a.createElement("button",{className:"RESET",onClick:function(e){return function(e){u(),p("allies",-s),p("axis",-c);var a=0,n=0;o.allies.forEach((function(e){var n=t.filter((function(a){return a.name===e.name}));a+=n[0].points})),o.axis.forEach((function(e){var a=t.filter((function(a){return a.name===e.name}));n+=a[0].points})),p("allies",a),p("axis",n)}()}},"RESET"))})),N=t(7),v=t.n(N),y=Object(c.b)(null,{addShips:function(e){return function(a){a({payload:e,type:"ADD_SHIP"})}}})((function(e){var a=[];return Object(n.useEffect)((function(){v()("input[type=radio]").each((function(e){v()(this).attr("name",e+""),a.push(!1)})),v()("input[type=radio]").click((function(t){var n=[],l=parseInt(v()(this).prop("name"));if(0===l)for(var i=1;i<12;i++)v()("[name=".concat(i+"","]")).prop("checked",!1),a[i]=!1;else if(12===l)for(var s=13;s<a.length;s++)v()("[name=".concat(s+"","]")).prop("checked",!1),a[s]=!1;else l<12?(v()("[name=0]").prop("checked",!1),a[0]=!1):(v()("[name=12]").prop("checked",!1),a[12]=!1);a[l]=!a[l],a[l]||v()(this).prop("checked",!1),a.forEach((function(e,a){if(!0===e){var t,l=v()("[name=".concat(a,"]")).parent().text();t=a<12?"allies":"axis",n.push({country:l,faction:t})}})),e.addShips(n)}))}),[]),l.a.createElement("div",{className:"allies-wrapper"},l.a.createElement("div",{className:"allies-text-wrapper"},l.a.createElement("h4",{className:"allies-text"},"Allies Faction")),l.a.createElement("div",{className:"allies-items"},l.a.createElement("label",{className:"container",id:"all","aria-checked":"false"},"All",l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"})),l.a.createElement("label",{className:"container",id:"france"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"France"),l.a.createElement("label",{className:"container",id:"new-zealand"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"New Zealand"),l.a.createElement("label",{className:"container",id:"united-kingdom"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"United Kingdom"),l.a.createElement("label",{className:"container",id:"australia"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Australia"),l.a.createElement("label",{className:"container",id:"greece"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Greece"),l.a.createElement("label",{className:"container",id:"poland"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Poland"),l.a.createElement("label",{className:"container",id:"united-states"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"United States"),l.a.createElement("label",{className:"container",id:"canada"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Canada"),l.a.createElement("label",{className:"container",id:"netherlands"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Netherlands"),l.a.createElement("label",{className:"container",id:"soviet-union"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Soviet Union"),l.a.createElement("label",{className:"container",id:"neutral"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Allies Neutral / Instalations")))})),k=function(e){return l.a.createElement("div",{className:"axis-wrapper"},l.a.createElement("div",{className:"axis-text-wrapper"},l.a.createElement("h4",{className:"axis-text"},"Axis Faction")),l.a.createElement("div",{className:"axis-items"},l.a.createElement("label",{className:"container",id:"all"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"All"),l.a.createElement("label",{className:"container",id:"italy"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Italy"),l.a.createElement("label",{className:"container",id:"finland"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Finland"),l.a.createElement("label",{className:"container",id:"japan"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Japan"),l.a.createElement("label",{className:"container",id:"germany"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Germany"),l.a.createElement("label",{className:"container",id:"neutral"},l.a.createElement("input",{type:"radio"}),l.a.createElement("span",{className:"checkmark"}),"Axis Neutral / Instalations")))},g=t(5),x=t(13),O=t.n(x),j=Object(c.b)((function(e){return{allies:e.userSelection.allies,axis:e.userSelection.axis,allShips:e.allShips,shipsInPlay:[].concat(Object(g.a)(e.shipsInPlay.allies),Object(g.a)(e.shipsInPlay.axis)),alliesPoints:e.factionPoints.allies,axisPoints:e.factionPoints.axis,maxPoints:e.points}}),{loadOneShip:u,updateOneShip:d,setFactionPoints:E})((function(e){var a=e.allies,t=e.axis,i=e.faction,s=e.shipsInPlay,c=e.allShips,r=e.loadOneShip,p=(e.updateOneShip,e.setFactionPoints),u=e.alliesPoints,d=e.axisPoints,h=e.maxPoints,E=Object(n.useState)([]),b=Object(f.a)(E,2),N=b[0],v=b[1],y=Object(n.useState)([]),k=Object(f.a)(y,2),x=k[0],j=k[1],S={},P=["Italy","Finland","Japan","Germany","Axis Neutral/Installations"];Object(n.useEffect)((function(){function e(){return(e=Object(m.a)(o.a.mark((function e(){var n,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="axis"===i?t:a,e.next=3,O.a.post("/ships/selected",{ships:n,faction:i},{headers:{"Content-Type":"application/json"}});case 3:l=e.sent,v(l.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(n.useEffect)((function(){console.log(x)}),[x]),Object(n.useEffect)((function(){!function(){N.forEach((function(e){-1==Object.keys(S).indexOf(e.nation)?S[e.nation]=[{name:e.name,number_available:e.number_available,class:e.class,points:e.points}]:(console.log(S),S[e.nation].push({name:e.name,number_available:e.number_available,class:e.class,points:e.points}))})),console.log(S);var e=[];Object.keys(S).forEach((function(a){e.push({nation:a,ships:S[a]})})),j([].concat(Object(g.a)(x),e))}()}),[N]);var w=0;function C(e,a){console.log(a);var t=x.filter((function(e){if(e.nation===a)return e}));t=t[0].ships;var n=e.target.parentNode.querySelector("[name=ship]").textContent,l=s.filter((function(e){return e.name===n}));if(0===l.length){var i,o=c.filter((function(e){return e.name===n}));o=o[0],i=-1==P.indexOf(o.nation)?"allies":"axis",console.log(i),o=o.points,"allies"===i?u+o<=h&&(r(n,i),p(i,o)):d+o<=h&&(r(n,i),p(i,o))}else{var m=l.length,f=c.filter((function(e){return e.name===n}));if(m<(f=f[0].number_available)){var E,b=c.filter((function(e){return e.name===n}));b=b[0],E=-1==P.indexOf(b.nation)?"allies":"axis",b=b.points,"allies"==E?u+b<=h&&(r(n,E),p(E,b)):d+b<=h&&(r(n,E),p(E,b))}}}return l.a.createElement("div",{id:"add-ship"},l.a.createElement("div",{id:"ship-content"},"allies"===i?x.map((function(e){return l.a.createElement("div",{className:"ship-wrapper"},l.a.createElement("p",{key:w++,className:"header-text"},e.nation),e.ships.map((function(a){var t=s.filter((function(e){return e.name===a.name})),i=t.length>0?a.number_available-t.length:a.number_available;return i>0?l.a.createElement("div",{className:"ship-content-holder",onClick:function(a){return C(a,e.nation)}},l.a.createElement("p",{key:w++,name:"ship",className:"ship"},a.name),l.a.createElement("p",{key:w++,name:"class",className:"class"},"Class: ",a.class?a.class:"N/A"),l.a.createElement("p",{key:w++,name:"number-available",className:"number-available"},"Qty: ",i),l.a.createElement("p",{key:w++,name:"point-value",className:"point-value"},"Pts: ",a.points)):l.a.createElement(n.Fragment,null)})))})):x.map((function(e){return l.a.createElement("div",{className:"ship-wrapper"},l.a.createElement("p",{key:w++,className:"header-text"},e.nation),e.ships.map((function(a){var t=s.filter((function(e){return e.name===a.name})),i=t.length>0?a.number_available-t.length:a.number_available;return i>0?l.a.createElement("div",{className:"ship-content-holder",onClick:function(a){return C(a,e.nation)}},l.a.createElement("p",{key:w++,name:"ship",className:"ship"},a.name),l.a.createElement("p",{key:w++,name:"class",className:"class"},"Class: ",a.class?a.class:"N/A"),l.a.createElement("p",{key:w++,name:"number-available",className:"number-available"},"Qty: ",i),l.a.createElement("p",{key:w++,name:"point-value",className:"point-value"},"Pts: ",a.points)):l.a.createElement(n.Fragment,null)})))}))))})),S=t(1),P=Object(c.b)((function(e){return{alliesShips:e.shipsInPlay.allies,axisShips:e.shipsInPlay.axis,allShips:e.allShips}}),{toggleLock:function(e,a){return function(t){t({payload:{ship:e,faction:a},type:"TOGGLE_LOCK"})}},removeOneShip:function(e){return function(){var a=Object(m.a)(o.a.mark((function a(t){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:console.log(e),t({payload:e,type:"REMOVE_ONE_SHIP"});case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},setFactionPoints:E})((function(e){var a,t=e.alliesShips,i=e.axisShips,s=e.faction,c=e.allShips,r=e.toggleLock,o=e.removeOneShip,m=e.setFactionPoints,p=[],u=[];function d(e){if(-1==Array.from(e.target.classList).indexOf("fa")){var a=e.target.getAttribute("name");console.log(a),r(a,"allies");var t=e.target.querySelector("input");t&&(t.checked=!t.checked)}}function h(e){if(-1==Array.from(e.target.classList).indexOf("fa")){var a=e.target.getAttribute("name");console.log(a),r(a,"axis");var t=e.target.querySelector("input");t&&(t.checked=!t.checked)}}function f(e){var a=e.target.getAttribute("name");o({name:e.target.getAttribute("name")});var t=a.split(" ");t.splice(t.length-1,1),t=t.join(" "),console.log(t);var n=c.filter((function(e){return e.name===t}));n=n[0],console.log(n);-1!==["Italy","Finland","Japan","Germany","Axis Neutral/Instalations"].indexOf(n.nation)?m("axis",-n.points):m("allies",-n.points)}Object(n.useEffect)((function(){a=document.querySelectorAll("inputs[class=no-pointer"),console.log(a)}),[t,i]),c.forEach((function(e){t.forEach((function(a){a.name===e.name&&p.push(Object(S.a)(Object(S.a)({},e),{},{secretName:a.secretName,locked:a.locked}))})),i.forEach((function(a){a.name===e.name&&u.push(Object(S.a)(Object(S.a)({},e),{},{secretName:a.secretName,locked:a.locked}))}))}));var E=0;return l.a.createElement("div",{className:"display-ship-wrapper"},"allies"===s?p.map((function(e){return e.image?l.a.createElement("div",{key:E++,className:"ship-wrapper",name:e.secretName,onClick:function(e){return d(e)}},l.a.createElement("span",{key:E++,className:"no-pointer"},"Lock: "),e.locked?l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox",checked:!0}):l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox"}),l.a.createElement("i",{name:e.secretName,className:"fa fa-trash delete",onClick:function(e){return f(e)}}),l.a.createElement("div",{key:E++,className:"ship-placard no-pointer"},l.a.createElement("img",{key:E++,className:"image-ship-placard no-pointer",src:e.image,alt:e.name}))):l.a.createElement("div",{key:E++,className:"ship-wrapper",name:e.secretName,onClick:function(e){return d(e)}},l.a.createElement("span",{key:E++,className:"no-pointer"},"Lock: "),e.locked?l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox",checked:!0}):l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox"}),l.a.createElement("i",{name:e.secretName,className:"fa fa-trash delete",onClick:function(e){return f(e)}}),l.a.createElement("div",{key:E++,className:"ship-placard no-pointer"},l.a.createElement("h3",{key:E++,className:"no-pointer"},e.name),l.a.createElement("h5",{key:E++,className:"no-pointer"},e.nation),l.a.createElement("h5",{key:E++,className:"no-pointer"},e.points)))})):u.map((function(e){return e.image?l.a.createElement("div",{key:E++,className:"ship-wrapper",name:e.secretName,onClick:function(e){return h(e)}},l.a.createElement("span",{key:E++,className:"no-pointer"},"Lock: "),e.locked?l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox",checked:!0}):l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox"}),l.a.createElement("i",{name:e.secretName,className:"fa fa-trash delete",onClick:function(e){return f(e)}}),l.a.createElement("div",{key:E++,className:"ship-placard no-pointer"},l.a.createElement("img",{key:E++,className:"image-ship-placard no-pointer",src:e.image,alt:e.name}))):l.a.createElement("div",{key:E++,className:"ship-wrapper",name:e.secretName,onClick:function(e){return h(e)}},l.a.createElement("span",{key:E++,className:"no-pointer"},"Lock: "),e.locked?l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox",checked:!0}):l.a.createElement("input",{key:E++,className:"no-pointer",name:e.secretName,type:"checkbox"}),l.a.createElement("i",{name:e.secretName,className:"fa fa-trash delete",onClick:function(e){return f(e)}}),l.a.createElement("div",{key:E++,className:"ship-placard no-pointer"},l.a.createElement("h3",{key:E++,className:"no-pointer"},e.name),l.a.createElement("h5",{key:E++,className:"no-pointer"},e.nation),l.a.createElement("h5",{key:E++,className:"no-pointer"},e.points)))})))})),w=Object(c.b)((function(e){return{points:e.points,alliesPoints:e.factionPoints.allies}}),{})((function(e){var a=e.points,t=e.alliesPoints,i=Object(n.useState)(!1),s=Object(f.a)(i,2),c=s[0],r=s[1];return l.a.createElement("div",{className:"allies-list-wrapper"},l.a.createElement("div",{className:"allies-list-header-wrapper"},l.a.createElement("div",{className:"text-wrapper"},l.a.createElement("h4",null,"Allies list"),l.a.createElement("p",null,t," / ",a)),l.a.createElement("div",{className:"save-options"},l.a.createElement("i",{className:"fa fa-print"}),l.a.createElement("i",{className:"fa fa-file-pdf-o"}))),l.a.createElement("div",{className:"line"},l.a.createElement("hr",null)),l.a.createElement("div",{className:"add-unit"},l.a.createElement(P,{faction:"allies"}),l.a.createElement("p",{onClick:function(e){r(!c)}},"[",c?"-":"+","] Add Unit"),c&&l.a.createElement(j,{faction:"allies"})))})),C=Object(c.b)((function(e){return{points:e.points,axisPoints:e.factionPoints.axis}}),{})((function(e){var a=e.points,t=e.axisPoints,i=Object(n.useState)(!1),s=Object(f.a)(i,2),c=s[0],r=s[1];return l.a.createElement("div",{className:"axis-list-wrapper"},l.a.createElement("div",{className:"axis-list-header-wrapper"},l.a.createElement("div",{className:"text-wrapper"},l.a.createElement("h4",null,"Axis list"),l.a.createElement("p",null,t," / ",a)),l.a.createElement("div",{className:"save-options"},l.a.createElement("i",{className:"fa fa-print"}),l.a.createElement("i",{className:"fa fa-file-pdf-o"}))),l.a.createElement("div",{className:"line"},l.a.createElement("hr",null)),l.a.createElement("div",{className:"add-unit"},l.a.createElement(P,{faction:"axis"}),l.a.createElement("p",{onClick:function(e){r(!c)}},"[",c?"-":"+","] Add Unit"),c&&l.a.createElement(j,{faction:"axis"})))})),A=t(10),I=t(13),_=t(7),T=Object(c.b)((function(e){return{allShips:e.allShips}}),{})((function(e){var a=e.allShips,t=Object(n.useState)({nation:"",units:"",name:"",points:"",class:"",image:""}),i=Object(f.a)(t,2),s=i[0],c=i[1],r=Object(n.useState)({nation:"",units:"",name:"",points:"",class:"",image:""}),p=Object(f.a)(r,2),u=p[0],d=p[1],h=Object(n.useState)({name:""}),E=Object(f.a)(h,2),b=E[0],N=E[1];Object(n.useEffect)((function(){console.log(u)}),[u]);var v=Object(n.useState)("new ship"),y=Object(f.a)(v,2),k=y[0],g=y[1];function x(e){return O.apply(this,arguments)}function O(){return(O=Object(m.a)(o.a.mark((function e(a){var t,n,l,i,c,r,m,p,d,h,f,E;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),"new ship"!==k){e.next=37;break}if(""===s.name||""===s.nation||""===s.units||""===s.points){e.next=34;break}if(t={headers:{"Content-Type":"application/json"}},e.prev=4,n=s,console.log(s),l=new FormData,!(i=document.getElementById("new-image")).files[0]){e.next=23;break}return console.log("inside the file statement"),l.append("image",i.files[0],i.files[0].name),e.next=14,I.post("/ships/ship-url",l);case 14:return r=e.sent,c=r.data,console.log(c),n.image=c,e.next=20,I.put("/ships",n,t);case 20:alert("Ship added with image"),e.next=26;break;case 23:return e.next=25,I.put("/ships",n,t);case 25:alert("Ship added with no image");case 26:e.next=32;break;case 28:e.prev=28,e.t0=e.catch(4),console.log(e.t0),alert("Error adding new ship");case 32:e.next=35;break;case 34:alert("Info not filled out completely");case 35:e.next=72;break;case 37:if("delete ship"!==k){e.next=50;break}return console.log(b),e.prev=39,e.next=42,I.delete("/ships/ship",{data:b},{headers:{"Content-Type":"application/json"}});case 42:alert("Successfully deleted "+b.name),e.next=48;break;case 45:e.prev=45,e.t1=e.catch(39),alert("Error deleting "+b.name);case 48:e.next=72;break;case 50:if(m=new FormData,p=document.getElementById("update-image"),h={headers:{"Content-Type":"application/json"}},!p.files[0]){e.next=69;break}return console.log("inside the file statement"),m.append("image",p.files[0],p.files[0].name),e.next=58,I.post("/ships/ship-url",m);case 58:return f=e.sent,d=f.data,console.log(d),(E=u).image=d,e.next=65,I.put("/ships/update",E,h);case 65:alert("Update complete"),console.log("existingShip should be updated now"),e.next=72;break;case 69:return e.next=71,I.put("/ships/update",u,h);case 71:alert("Update complete");case 72:case"end":return e.stop()}}),e,null,[[4,28],[39,45]])})))).apply(this,arguments)}function j(e){c(Object(S.a)(Object(S.a)({},s),{},Object(A.a)({},e.target.name,e.target.value)))}function P(e){d(Object(S.a)(Object(S.a)({},u),{},Object(A.a)({},e.target.name,e.target.value)))}return _(document).ready((function(){_("#add-new-ship").unbind().click((function(){g("new ship"),_(this).hasClass("non-selected")&&(_(this).removeClass("non-selected"),_("#update-existing-ship").addClass("non-selected"),_("#delete-existing-ship").addClass("non-selected"))})),_("#update-existing-ship").unbind().click((function(){g("update ship"),_(this).hasClass("non-selected")&&(_(this).removeClass("non-selected"),_("#add-new-ship").addClass("non-selected"),_("#delete-existing-ship").addClass("non-selected"))})),_("#delete-existing-ship").unbind().click((function(){g("delete ship"),_(this).hasClass("non-selected")&&(_(this).removeClass("non-selected"),_("#add-new-ship").addClass("non-selected"),_("#update-existing-ship").addClass("non-selected"))}))})),l.a.createElement("form",{className:"db-container",onSubmit:function(){var e=Object(m.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()},l.a.createElement("div",{className:"db-container-banner"},l.a.createElement("div",{className:"db-container-text-options"},l.a.createElement("h3",{className:"db-container-header",id:"add-new-ship"},"Add a new ship"),l.a.createElement("h3",{className:"db-container-header non-selected",id:"update-existing-ship"},"Update Existing Ship"),l.a.createElement("h3",{className:"db-container-header non-selected",id:"delete-existing-ship"},"Delete Existing Ship")),l.a.createElement("hr",null)),l.a.createElement("div",{className:"specifications"},"new ship"===k?l.a.createElement(n.Fragment,null,l.a.createElement("input",{placeholder:"Nation",name:"nation",value:s.nation,onChange:function(e){return j(e)}}),l.a.createElement("input",{placeholder:"Number of units available",type:"number",name:"units",value:s.units,onChange:function(e){return j(e)}}),l.a.createElement("input",{placeholder:"Ship name",name:"name",value:s.name,onChange:function(e){return j(e)}}),l.a.createElement("input",{placeholder:"Points Value/Unit",name:"points",type:"number",value:s.points,onChange:function(e){return j(e)}}),l.a.createElement("input",{placeholder:"Ship class",name:"class",value:s.class,onChange:function(e){return j(e)}}),l.a.createElement("input",{type:"file",name:"image",id:"new-image",onChange:function(e){return j(e)}}),l.a.createElement("input",{type:"submit",className:"database-submit",placeholder:"submit"})):"update ship"===k?l.a.createElement(n.Fragment,null,l.a.createElement("label",{htmlFor:"ships"},"Choose the name of the ship to modify"),l.a.createElement("select",{id:"ship-selector",name:"ships",onChange:function(e){return function(e){var t=e.target.value,n=a.filter((function(e){return e.name===t}));n=n[0],d(Object(A.a)({nation:n.nation,class:n.class,points:n.points,units:n.number_available,name:n.name,image:n.image?n.image:""},"class",n.class?n.class:""))}(e)}},a.map((function(e){return l.a.createElement("option",{value:e.name},e.name)}))),l.a.createElement("label",{for:"nation"},"Nation: "),l.a.createElement("input",{placeholder:"Nation",name:"nation",value:u.nation,onChange:function(e){return P(e)}}),l.a.createElement("label",{for:"units"},"Number Available: "),l.a.createElement("input",{placeholder:"Number available",name:"units",value:u.units,onChange:function(e){return P(e)}}),l.a.createElement("label",{for:"points"},"Points: "),l.a.createElement("input",{placeholder:"Points",name:"points",value:u.points,onChange:function(e){return P(e)}}),l.a.createElement("label",{for:"class"},"Class: "),l.a.createElement("input",{placeholder:"Class",name:"class",value:u.class,onChange:function(e){return P(e)}}),u.image?l.a.createElement("img",{className:"existing-image",src:u.image,alt:"ship image here"}):l.a.createElement("label",null,"No image for ",u.name),l.a.createElement("input",{placeholder:"Image",type:"file",name:"image",id:"update-image"}),l.a.createElement("input",{type:"submit",className:"database-submit",placeholder:"submit"})):l.a.createElement(n.Fragment,null,l.a.createElement("label",{htmlFor:"ships"},"Choose the name of the ship to delete"),l.a.createElement("select",{id:"ship-selector",name:"ships",onChange:function(e){return function(e){var a=e.target.value;N(Object(S.a)(Object(S.a)({},b),{},{name:a}))}(e)}},a.map((function(e){return l.a.createElement("option",{value:e.name},e.name)}))),l.a.createElement("input",{type:"submit",className:"database-submit",placeholder:"submit"}))))})),F=(t(60),t(8)),L=t(28),D=t(29),H={allies:[],axis:[]},G={allies:0,axis:0},M={axis:[],allies:[]},U=[],R=Object(F.combineReducers)({userSelection:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case"ADD_SHIP":return e.axis=[],e.allies=[],n.forEach((function(a){e="axis"===a.faction?"All"===a.country?Object(S.a)(Object(S.a)({},e),{},{axis:["All"]}):Object(S.a)(Object(S.a)({},e),{},{axis:[].concat(Object(g.a)(e.axis),[a.country])}):"All"===a.country?Object(S.a)(Object(S.a)({},e),{},{allies:["All"]}):Object(S.a)(Object(S.a)({},e),{},{allies:[].concat(Object(g.a)(e.allies),[a.country])})})),e;default:return Object(S.a)({},e)}},points:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1?arguments[1]:void 0,t=a.payload,n=a.type;switch(n){case"SET_POINTS":return""==t?0:Number(t);default:return e}},factionPoints:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,a=arguments.length>1?arguments[1]:void 0,t=a.payload,n=a.type;switch(n){case"SET_ALLIES_POINTS":return Object(S.a)(Object(S.a)({},e),{},{allies:e.allies+t});case"SET_AXIS_POINTS":return Object(S.a)(Object(S.a)({},e),{},{axis:e.axis+t});default:return e}},shipsInPlay:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case"REMOVE_ONE_SHIP":var l=e;return console.log(n.name),l.allies=l.allies.filter((function(e){return e.secretName!==n.name})),l.axis=l.axis.filter((function(e){return e.secretName!==n.name})),l.allies||(l.allies=[]),l.axis||(l.axis=[]),l;case"REMOVE_SHIP":var i=e;return i.allies=i.allies.filter((function(e){return 1==e.locked})),i.axis=i.axis.filter((function(e){return 1==e.locked})),i.allies||(i.allies=[]),i.axis||(i.axis=[]),i;case"TOGGLE_LOCK":var s=e;return"allies"==n.faction?s.allies=s.allies.map((function(e){return e.secretName==n.ship?Object(S.a)(Object(S.a)({},e),{},{locked:!e.locked}):Object(S.a)({},e)})):s.axis=s.axis.map((function(e){return e.secretName==n.ship?Object(S.a)(Object(S.a)({},e),{},{locked:!e.locked}):Object(S.a)({},e)})),s;case"LOAD_ONE_SHIP":if("axis"==n.faction){var c=n.ship;return c+=" "+e.axis.filter((function(e){return e.name===n.ship})).length,Object(S.a)(Object(S.a)({},e),{},{axis:[].concat(Object(g.a)(e.axis),[{name:n.ship,secretName:c,locked:!1}])})}var r=n.ship;return r+=" "+e.allies.filter((function(e){return e.name===n.ship})).length,Object(S.a)(Object(S.a)({},e),{},{allies:[].concat(Object(g.a)(e.allies),[{name:n.ship,secretName:r,locked:!1}])});case"UPDATE_ONE_SHIP":var o=e;return o.allies=o.allies.map((function(e){if(e.name!==n.ship)return e;var a=e.quantity+1;return Object(S.a)(Object(S.a)({},e),{},{quantity:a})})),o.axis=o.axis.map((function(e){if(e.name!==n.ship)return e;var a=e.quantity+1;return Object(S.a)(Object(S.a)({},e),{},{quantity:a})})),o;default:return e}},allShips:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,a=arguments.length>1?arguments[1]:void 0,t=a.payload,n=a.type;switch(n){case"LOAD_IN_SHIPS":return e.push.apply(e,Object(g.a)(t.allies)),e.push.apply(e,Object(g.a)(t.axis)),e;default:return e}}}),q=[D.a],J=Object(F.createStore)(R,{},Object(L.composeWithDevTools)(F.applyMiddleware.apply(void 0,q)));var V=function(){return l.a.createElement(c.a,{store:J},l.a.createElement("div",{className:"App"},l.a.createElement(h,null),l.a.createElement("div",{className:"game-preference-wrapper"},l.a.createElement(b,null),l.a.createElement(y,null),l.a.createElement(k,null)),l.a.createElement("div",{className:"card-results"},l.a.createElement(w,null),l.a.createElement(C,null)),l.a.createElement(T,null)))};s.a.render(l.a.createElement(V,null),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.975ee727.chunk.js.map