(self.webpackChunkmovie_app_ts=self.webpackChunkmovie_app_ts||[]).push([[954],{3643:function(e,n,a){"use strict";a.d(n,{Z:function(){return u}});var i=a(8683),r=a(2982),s=a(2791),t=a(6839),c=a(1087),o=a(184),l=function(e){var n=e.poster_path,a=e.title,i=e.overview,r=e.vote_average,s=e.id;return(0,o.jsxs)(c.rU,{to:"/movie-app-ts/search/".concat(s),className:"movie-card",children:[(0,o.jsxs)("div",{className:"overlay",children:[(0,o.jsx)("h3",{children:a}),(0,o.jsx)("p",{children:i})]}),(0,o.jsx)("div",{className:"rate-circle "+(r>=8?"good":r>4?"normal":"bad"),children:r}),(0,o.jsx)("img",{src:n?"https://image.tmdb.org/t/p/w200".concat(n):"https://ih1.redbubble.net/image.370389900.3139/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg",alt:"".concat(a," Poster")})]})},u=function(e){var n=e.isLoading,a=e.movies;return(0,o.jsx)("div",{className:"movie-grid",children:n?(0,r.Z)(new Array(20)).map((function(e,n){return(0,o.jsx)(t.Z,{baseColor:"#5d5c5c",highlightColor:"#858585",height:300,width:200},n)})):a.map((function(e){return(0,s.createElement)(l,(0,i.Z)((0,i.Z)({},e),{},{key:e.id}))}))})}},6782:function(e,n,a){"use strict";a(2791);var i=a(184);n.Z=function(e){for(var n=e.total_pages,a=e.page,r=e.onClickHandler,s=Math.min(n,500),t=[],c=0;c<s;c++)t.push(c+1);return t=a>4?t.splice(a-4,9):a<=4?t.splice(0,9):t.splice(490,9),n<2?(0,i.jsx)(i.Fragment,{}):(0,i.jsxs)("div",{className:"pagination",children:[a>4?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{onClick:function(){return r(1)},className:"pagination-number"+(1===a?" active-page":""),children:"1"}),(0,i.jsx)("span",{className:"pagination-number",children:" ... "})]}):"",t.map((function(e){return(0,i.jsx)("span",{onClick:function(){return r(e)},className:"pagination-number"+(a===e?" active-page":""),children:e},e)})),a<s-4?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:"pagination-number",children:" ... "}),(0,i.jsx)("span",{onClick:function(){return r(s)},className:"pagination-number"+(a===s?" active-page":""),children:s})]}):""]})}},8268:function(e,n,a){"use strict";a.r(n);var i=a(2791),r=a(5027),s=a(9434),t=a(6782),c=a(6210),o=a(3643),l=a(2808),u=a.n(l),p=a(7689),d=a(184);n.default=function(){var e=(0,p.s0)(),n=(0,r.T)(),a=(0,s.v9)(c.No),l=(0,s.v9)(c.yH),m=(0,s.v9)(c.HA),h=(0,s.v9)(c.Fr),g=i.useRef(!1);return(0,i.useEffect)((function(){if(g.current){var a={currentPage:m},i=u().stringify(a,{skipNulls:!0});e("?".concat(i))}n((0,c.tt)(m)),g.current=!0}),[m]),i.useEffect((function(){if(window.location.search){var e=u().parse(window.location.search.substring(1));n((0,c.D4)(Number(e.currentPage)))}g.current=!0}),[]),(0,d.jsx)("div",{className:"movie-page popular-page",children:(0,d.jsxs)("div",{className:"container movie-page__container",children:[(0,d.jsx)("div",{className:"subheader",children:(0,d.jsx)("h1",{className:"heading",children:"Upcoming movies"})}),(0,d.jsx)(o.Z,{isLoading:h,movies:a}),(0,d.jsx)(t.Z,{page:m,total_pages:l,onClickHandler:function(e){return n((0,c.D4)(e))}})]})})}},4654:function(){}}]);
//# sourceMappingURL=954.14465edd.chunk.js.map