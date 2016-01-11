angular.module("your_app_name.views", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/app/forms.html","<ion-view class=\"forms-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Forms</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">Inline Labels</div>\n      \n      <label class=\"item item-input\">\n        <span class=\"input-label\">First Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Last Name</span>\n        <input type=\"text\">\n      </label>\n      <label class=\"item item-input\">\n        <span class=\"input-label\">Email</span>\n        <input type=\"email\">\n      </label>\n\n      <div class=\"item item-divider\">Floating Labels</div>\n\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Telephone</span>\n        <input type=\"tel\" placeholder=\"Your phone\">\n      </label>\n      <label class=\"item item-input item-floating-label\">\n        <span class=\"input-label\">Number</span>\n        <input type=\"number\" placeholder=\"Some number\">\n      </label>\n\n      <div class=\"item item-divider\">Stacked Labels</div>\n\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Birth date</span>\n        <input type=\"date\">\n      </label>\n      <label class=\"item item-input item-stacked-label\">\n        <span class=\"input-label\">Month</span>\n        <input type=\"month\">\n      </label>\n\n      <div class=\"item item-divider\">Placeholder Labels</div>\n\n      <label class=\"item item-input\">\n        <textarea placeholder=\"Description\"></textarea>\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" placeholder=\"Your password\">\n      </label>\n\n      <div class=\"item item-divider\">Inset Inputs</div>\n\n      <div class=\"item item-input-inset\">\n        <label class=\"item-input-wrapper\">\n          <input type=\"text\" placeholder=\"Search...\">\n        </label>\n        <button class=\"button button-small\">\n          Submit\n        </button>\n      </div>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/gustos.html","<ion-view class=\"bookmarks-view\">\n  <ion-nav-title>\n    <span>Gustos</span>\n  </ion-nav-title>\n  <ion-content>\n    <ion-toggle ng-model=\"comida\" toggle-class=\"toggle-dark\" ng-checked=\"comida\">Comida</ion-toggle>\n    <ion-toggle ng-model=\"diversion\" toggle-class=\"toggle-dark\" ng-checked=\"diversion\">Diversion</ion-toggle>\n    <ion-toggle ng-model=\"nocturno\" toggle-class=\"toggle-dark\" ng-checked=\"nocturno\">Nocturno</ion-toggle>\n    <ion-toggle ng-model=\"compras\" toggle-class=\"toggle-dark\" ng-checked=\"compras\">Compras</ion-toggle>\n    <div class=\"item item-divider\"></div>\n\n    <div class=\"button icon-right ion-chevron-right button-assertive\" ng-controller=\"GustosCtrl\" ng-click=\"actualizar()\">Actualizar</div>\n  </ion-content>\n\n</ion-view>\n");
$templateCache.put("views/app/profile.html","<ion-view class=\"profile-view\">\n  <ion-nav-title>\n    <span>Profile</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"top-content row\">\n      <div class=\"profile-container\">\n        <div class=\"user-image-container\">\n          <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\n            <img class=\"user-image\" ng-src=\"/../../img/56783131e21b00f6422c0456/avatar.jpg\" spinner-on-load>\n          </pre-img>\n        </div>\n        <div class=\"user-name\">{{user.nombre}}</div>\n        <div class=\"user-twitter\">{{user.apellidos}}</div>\n      </div>\n      <div class=\"user-background-image-outer\">\n        <div multi-bg=\"[\'/../../img/56783131e21b00f6422c0456/avatar.jpg\']\"></div>\n      </div>\n    </div>\n    <div class=\"bottom-content\">\n      <div class=\"user-bio\">\n        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/settings.html","<ion-view class=\"settings-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Settings</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <div class=\"item item-divider\">TOGGLE</div>\n\n      <ion-toggle ng-model=\"airplaneMode\" toggle-class=\"toggle-assertive\">Airplane Mode</ion-toggle>\n      <ion-toggle ng-model=\"wifi\" toggle-class=\"toggle-positive\">Wi-Fi</ion-toggle>\n      <ion-toggle ng-model=\"bluetooth\" toggle-class=\"toggle-calm\">Bluetooth</ion-toggle>\n      <ion-toggle ng-model=\"personalHotspot\" toggle-class=\"toggle-dark\">Personal Hotspot</ion-toggle>\n\n      <div class=\"item item-divider\">CHECKBOXES</div>\n\n      <ion-checkbox ng-model=\"checkOpt1\">Option 1</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt2\">Option 2</ion-checkbox>\n      <ion-checkbox ng-model=\"checkOpt3\">Option 3</ion-checkbox>\n\n      <div class=\"item item-divider\">RADIO</div>\n\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'A\'\">Choose A</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'B\'\">Choose B</ion-radio>\n      <ion-radio ng-model=\"radioChoice\" ng-value=\"\'C\'\">Choose C</ion-radio>\n\n      <div class=\"item item-divider\">RANGES</div>\n\n      <div class=\"range\">\n        <i class=\"icon ion-volume-low\"></i>\n        <input type=\"range\" name=\"volume\">\n        <i class=\"icon ion-volume-high\"></i>\n      </div>\n      <div class=\"item range range-positive\">\n        <i class=\"icon ion-ios-sunny-outline\"></i>\n        <input type=\"range\" name=\"volume\" min=\"0\" max=\"100\" value=\"33\">\n        <i class=\"icon ion-ios-sunny\"></i>\n      </div>\n\n      <div class=\"item item-divider\"></div>\n\n      <button class=\"button button-block button-assertive\" ng-click=\"showLogOutMenu()\">\n        Logout\n      </button>\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/side-menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n  <ion-side-menu-content class=\"post-size-14px\">\n    <ion-nav-bar class=\"bar app-top-bar\">\n      <ion-nav-back-button>\n      </ion-nav-back-button>\n      <ion-nav-buttons side=\"left\">\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\">\n        </button>\n      </ion-nav-buttons>\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu side=\"left\" class=\"main-menu\" expose-aside-when=\"large\">\n    <ion-content>\n      <ion-list>\n        <ion-item class=\"heading-item item item-avatar\" nav-clear menu-close ui-sref=\"app.profile\">\n          <div class=\"user-image-container\">\n            <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\n              <img class=\"user-image\" ng-src=\"{{user.avatar}}\" spinner-on-load>\n          	</pre-img>\n          </div>\n          <h2 class=\"greeting\">{{user.nombre}}</h2>\n          <p class=\"message\">Bienvenido</p>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.feeds-categories\">\n          <i class=\"icon ion-ios-book-outline\"></i>\n          <h2 class=\"menu-text\">Locales</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.gustos\">\n          <i class=\"icon ion-happy-outline\"></i>\n          <h2 class=\"menu-text\">Cambiar Gustos</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.miscellaneous\">\n          <i class=\"icon ion-ios-star-outline\"></i>\n          <h2 class=\"menu-text\">Favoritos</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.forms\">\n          <i class=\"icon ion-chatbox-working\"></i>\n          <h2 class=\"menu-text\">Comentarios</h2>\n        </ion-item>\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.settings\">\n          <i class=\"icon ion-gear-a\"></i>\n          <h2 class=\"menu-text\">Settings</h2>\n        </ion-item>\n\n    </ion-list>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>\n");
$templateCache.put("views/auth/auth.html","<ion-nav-view class=\"auth-outer\">\n	<div multi-bg=\"[\'img/bg-gif.gif\']\"></div>\n	<!-- <div multi-bg=\"[\'img/bg-img.jpg\']\"></div> -->\n</ion-nav-view>\n");
$templateCache.put("views/auth/forgot-password.html","<ion-view class=\"forgot-password-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card forgot-password-container\">\n          <form name=\"forgot_password_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n                Recover it\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"log-in button button-small button-clear button-light\" ui-sref=\"auth.login\">\n            Log In\n          </a>\n          <a class=\"sign-up button button-small button-clear button-light\" ui-sref=\"auth.signup\">\n            Sign Up\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/login.html","<ion-view class=\"login-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card login-container\" content-tabs tabsdata=\'tabsdata\'>\n          <form name=\"login_form\" class=\"\" novalidate ng-cloak>\n            <my-tabs>\n              <my-tab title=\"Email\">\n                <div class=\"list\">\n                  <label class=\"item item-input\">\n                    <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.username\" required>\n                  </label>\n                  <label class=\"item item-input\" show-hide-container>\n                    <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n                  </label>\n                </div>\n              </my-tab>\n            </my-tabs>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doLogIn()\" ng-disabled=\"(selected_tab==\'Email\') ? (login_form.user_email.$invalid || login_form.user_password.$invalid) : ((selected_tab==\'Phone\') ? (login_form.user_phone.$invalid || login_form.user_pin.$invalid) : false)\">\n                Log In\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"forgot-password button button-small button-clear button-light\" ui-sref=\"auth.forgot-password\">\n            Forgot Password?\n          </a>\n          <a class=\"sign-up button button-small button-clear button-light\" ui-sref=\"auth.signup\">\n            Sign Up\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/signup.html","<ion-view class=\"signup-view auth-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card sign-up-container\">\n          <form name=\"signup_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n              <label class=\"item item-input\" show-hide-container>\n                <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-assertive button-block\" ng-click=\"doSignUp()\" ng-disabled=\"signup_form.$invalid\">\n                Sign Up\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <a class=\"log-in button button-small button-clear button-light\" ui-sref=\"auth.login\">\n            Log In\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/walkthrough.html","<ion-view class=\"walkthrough-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"top-content row\">\n      <div class=\"col col-center\">\n        <img ng-src=\"img/logo.png\">\n      </div>\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n        <a class=\"login button button-block button-stable\" ui-sref=\"auth.login\">\n          Log In\n        </a>\n        <a class=\"sign-up button button-block button-stable\" ui-sref=\"auth.signup\">\n          Sign Up\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/common/ionic-youtube-video.html","<youtube-video video-id=\"videoId\" player=\"yt_video\" player-vars=\"playerVars\"></youtube-video>\n");
$templateCache.put("views/common/multi-bg.html","<div class=\"multi-bg-outer\" ng-class=\"{ \'finish-loading\': loaded }\">\n	<img bg class=\"multi-bg {{ helperClass }}\" ng-src=\"{{ bg_img }}\"/>\n	<span class=\"bg-overlay\"></span>\n	<ion-spinner ng-show=\"!loaded\" class=\"spinner-on-load\"></ion-spinner>\n	<!-- <span ng-show=\"!loaded\" class=\"spinner-on-load ion-load-c\"></span> -->\n	<ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("views/common/my-tab.html","<div class=\"tab-content ng-cloak ng-hide\" ng-cloak ng-show=\"selected\" ng-transclude></div>\n");
$templateCache.put("views/common/my-tabs.html","<div class=\"item item-divider card-heding\">\n	<div class=\"tabs-striped\">\n		<div class=\"tabs\">\n			<a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n		</div>\n	</div>\n</div>\n<div class=\"item item-body\">\n	<div class=\"tabs-content\" ng-transclude></div>\n</div>\n");
$templateCache.put("views/common/pre-img.html","<div class=\"pre-img {{ratio}} {{ helperClass }}\" ng-class=\"{ \'finish-loading\': loaded }\">\n	<ion-spinner ng-show=\"!loaded\" class=\"spinner-on-load\"></ion-spinner>\n	<!-- <span ng-show=\"!loaded\" class=\"spinner-on-load ion-load-c\"></span> -->\n	<ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("views/common/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n	<span class=\"ion-eye-disabled\" ng-show=\"show\"></span>\n	<span class=\"ion-eye\" ng-show=\"!show\"></span>\n</a>\n");
$templateCache.put("views/app/feeds/add-comment.html","<ion-view class=\"profile-view\">\n    <ion-nav-title>\n        <span>{{user.nombre}} {{user.apellidos}}</span>\n    </ion-nav-title>\n    <ion-content>\n        <label class=\"item item-input\" ng-model=\"id\">\n            <textarea placeholder=\"Escriba su comentario\" rows=\"8\" cols=\"10\" ng-model=\"commentario\">\n	        </textarea>\n        </label>\n        <div class=\"button icon-right ion-chevron-right button-assertive\" ng-controller=\"GustosCtrl\" ng-click=\"newComment(commentario,id)\">Enviar</div>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/feeds/category-feeds.html","<ion-view class=\"category-feeds-view\">\n  <ion-nav-title>\n    <span>{{categoryTitle}}</span>\n  </ion-nav-title>\n  <ion-content>\n    <label class=\"item item-input\">\n      <i class=\"icon ion-search placeholder-icon\"></i>\n      <input type=\"search\" placeholder=\"Search\">\n    </label>\n    <div class=\"list category-feeds\">\n      <a ng-repeat=\"empresa in empresas\" class=\"item item-icon-right\" ng-controller=\"CategoryFeedsCtrl\" ng-click=\"detailEmpresa(empresa._id)\">\n        <div class=\"thumbnail-outer\">\n          <pre-img ratio=\"_1_1\" helper-class=\"\">\n            <img class=\"thumbnail\" ng-src=\"{{empresa.image}}\" spinner-on-load>\n          </pre-img>\n        </div>\n        <div>\n          <span class=\"title\">{{empresa.nombre}}</span>\n          <p class=\"description\">{{empresa.descripcion}}</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/feeds/detalles_empresa.html","<ion-view class=\"profile-view\">\n    <ion-nav-title>\n        <span>{{empresa.nombre}}</span>\n    </ion-nav-title>\n    <ion-content>\n        <div class=\"top-content row\">\n            <div class=\"profile-container\">\n                <div class=\"user-image-container\">\n                    <pre-img ratio=\"_1_1\" helper-class=\"rounded-image\">\n                        <img class=\"user-image\" ng-src=\"http://i0.wp.com/alt1040.com/files/2014/06/poly-wallpaper-2-800x450.jpg?resize=800%2C450\" spinner-on-load>\n                    </pre-img>\n                </div>\n                <div class=\"user-name\">{{empresa.ciudad}}</div>\n                <div class=\"user-twitter\">{{empresa.descripcion}}</div>\n            </div>\n            <div class=\"user-background-image-outer\">\n                <div multi-bg=\"[\'http://applediario.com/wp-content/uploads/2012/02/ox-mountain-lion-galaxy-wallpaper.png\']\"></div>\n            </div>\n        </div>\n\n        <div class=\"list category-feeds\">\n            <a ng-repeat=\"comentario in empresa.comentarios\" class=\"item item-icon-right\">\n                <div>\n                    <span class=\"title\">{{comentario.user}}</span>\n                    <p class=\"description\">{{comentario.comentario}}</p>\n                </div>\n                <i class=\"icon ion-arrow-right-c\"></i>\n            </a>\n        </div>\n        <div class=\"bottom-content\">\n            <div class=\"user-bio\">\n                <a ng-controller=\"FeedEntriesCtrl\" ng-click=\"NewComment(empresa)\"> New Comment\n                </a>\n                <div>{{empresa.direccion}}</div>\n\n            </div>\n        </div>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/feeds/feeds-categories.html","<ion-view class=\"feeds-categories-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Busca según Categorias</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"row categories-list\">\n      <div ng-repeat=\"category in feeds_categories\" class=\"col col-50\">\n        <a class=\"feed-category\" ui-sref=\"app.category-feeds({categoryId: (category.title | slugify)})\">\n          <pre-img ratio=\"_1_1\" helper-class=\"square-image\">\n            <img class=\"category-image\" ng-src=\"{{category.image}}\" spinner-on-load>\n          </pre-img>\n          <div class=\"category-bg\"></div>\n          <span class=\"category-title\">{{category.title}}</span>\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/layouts/layouts.html","<ion-view class=\"layouts-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Layouts</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list layouts-functionalities\">\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.tinder-cards\">\n        <i class=\"icon ion-happy-outline\"></i>\n        <div>\n          <span class=\"title\">Tinder Cards</span>\n          <p class=\"description\">Awesome Tinder Cards</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.slider\">\n        <i class=\"icon ion-arrow-swap\"></i>\n        <div>\n          <span class=\"title\">Slider</span>\n          <p class=\"description\">Example of sliding cards</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/layouts/slider.html","<ion-view class=\"slider-view\">\n  <ion-nav-title>\n    <span>Slider</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <ion-slide-box show-pager=\"true\">\n      <ion-slide ng-repeat=\"i in [1,2,3,4,5]\">\n        <div class=\"list card\">\n          <div class=\"item item-image\">\n            <img ng-src=\"http://lorempixel.com/300/200/nature?v={{i}}\">\n          </div>\n          <div class=\"item item-body\">\n            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slide-box>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/layouts/tinder-cards.html","<ion-view class=\"tinder-cards-view\">\n  <ion-nav-title>\n    <span>Tinder Cards</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <td-cards>\n      <td-card id=\"td-card\" ng-repeat=\"card in cards\"\n      on-transition-left=\"transitionLeft(card)\"\n      on-transition-right=\"transitionRight(card)\"\n      on-transition-out=\"transitionOut(card)\"\n      on-destroy=\"cardDestroyed($index)\"\n      on-swipe-left=\"cardSwipedLeft($index)\"\n      on-swipe-right=\"cardSwipedRight($index)\"\n      on-partial-swipe=\"cardPartialSwipe(amt)\">\n        <div class=\"image\">\n          <div class=\"no-text overlayBox\">\n            <div class=\"noBox boxed\">\n              Nope\n            </div>\n          </div>\n          <img ng-src=\"{{card.image}}\">\n          <div class=\"yes-text overlayBox\">\n            <div class=\"yesBox boxed\">\n              Yes\n            </div>\n          </div>\n        </div>\n        <div class=\"title\">\n          {{card.name}}\n        </div>\n      </td-card>\n    </td-cards>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/image-picker.html","<ion-view class=\"image-picker-view\">\n  <ion-nav-title>\n    <span>Image picker</span>\n  </ion-nav-title>\n  <ion-content class=\"padding\">\n    <button class=\"button button-block button-dark\" ng-click=\"selImages()\">\n      Select Images\n    </button>\n    <button  ng-show=\"images.length > 0\" class=\"button button-block button-stable\" ng-click=\"shareAll()\">\n      Share All\n    </button>\n    <div class=\"list card\" ng-repeat=\"img in images\">\n      <div class=\"item item-image\">\n        <img ng-src=\"{{img}}\">\n      </div>\n      <div class=\"item tabs tabs-secondary tabs-icon-left\">\n        <a class=\"tab-item image-option\" href=\"#\" ng-click=\"shareImage(img)\">\n          <i class=\"icon ion-share\"></i>\n          Share\n        </a>\n        <a class=\"tab-item assertive image-option\" href=\"#\" ng-click=\"removeImage(img)\">\n          <i class=\"icon ion-trash-a assertive\"></i>\n          Remove\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/maps.html","<ion-view class=\"maps-view\">\n  <ion-nav-title>\n    <span>Maps</span>\n  </ion-nav-title>\n  <ion-content scroll=\"false\">\n    <div class=\"mapWrap\"  data-tap-disabled=\"true\">\n      <div class=\"row center-map-action\">\n        <div class=\"col\">\n          <div class=\"list\">\n            <div class=\"item item-input-inset\">\n              <a class=\"button button-icon icon ion-pinpoint\" ng-click=\"centerOnMe()\"></a>\n              <label class=\"item-input-wrapper\">\n                <input type=\"text\" placeholder=\"My Location\" disabled ng-model=\"my_location\">\n              </label>\n            </div>\n          </div>\n        </div>\n      </div>\n      <map center=\"{{center_position.lat}},{{center_position.lng}}\" zoom=\"15\">\n        <marker\n            position=\"{{current_position.lat}},{{current_position.lng}}\"\n            title=\"Hello Marker\"\n            visible=\"true\">\n        </marker>\n        <info-window id=\"1\" position=\"{{info_position.lat}},{{info_position.lng}}\" visible=\"true\">\n          <div ng-non-bindable=\"\">\n            <b>The best restaurant</b><br>\n            This is html so you can put whatever <br>\n            you want such as images and <a href=\"\">links</a> <br>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=1\"></img>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=2\"></img>\n            <img style=\" border-radius: 24px;\" src=\"http://lorempixel.com/50/50/food/?v=3\"></img>\n          </div>\n        </info-window>\n      </map>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/miscellaneous/miscellaneous.html","<ion-view class=\"miscellaneous-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Miscellaneous</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"list miscellaneous-functionalities\">\n      <div dynamic-anchor-fix>\n        <a class=\"item item-icon-left item-icon-right\" href=\"http://www.ionicthemes.com\">\n          <i class=\"icon ion-ios-browsers-outline\"></i>\n          <div>\n            <span class=\"title\">In App Browser</span>\n            <p class=\"description\">Show web browser view with external links</p>\n          </div>\n          <i class=\"icon ion-arrow-right-c\"></i>\n        </a>\n      </div>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.maps\">\n        <i class=\"icon ion-map\"></i>\n        <div>\n          <span class=\"title\">Maps & GeoLocation</span>\n          <p class=\"description\">Show map & access user\'s current location</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" ui-sref=\"app.image-picker\">\n        <i class=\"icon ion-images\"></i>\n        <div>\n          <span class=\"title\">Image Picker</span>\n          <p class=\"description\">Select and share images from your phone</p>\n        </div>\n        <i class=\"icon ion-arrow-right-c\"></i>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"AdsCtrl\" ng-click=\"manageAdMob()\">\n        <i class=\"icon ion-social-usd-outline\"></i>\n        <div>\n          <span class=\"title\">AdMob</span>\n          <p class=\"description\">Show Google AdMob mobile ads</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"AdsCtrl\" ng-click=\"manageiAd()\">\n        <i class=\"icon ion-social-usd-outline\"></i>\n        <div>\n          <span class=\"title\">iAd</span>\n          <p class=\"description\">Show Apple iAd mobile ads</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"RateApp\" ng-click=\"rateApp()\">\n        <i class=\"icon ion-ios-star-half\"></i>\n        <div>\n          <span class=\"title\">Rate the app</span>\n          <p class=\"description\">Rate this app in Google and Apple stores</p>\n        </div>\n      </a>\n      <a class=\"item item-icon-left item-icon-right\" href=\"#\" ng-controller=\"SendMailCtrl\" ng-click=\"sendMail()\">\n        <i class=\"icon ion-email\"></i>\n        <div>\n          <span class=\"title\">Send email</span>\n          <p class=\"description\">Access your phone native email sender provider</p>\n        </div>\n      </a>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/wordpress.html","<ion-view class=\"wordpress-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>WordPress</span>\n  </ion-nav-title>\n  <ion-content>\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"posts-list\">\n      <div ng-repeat=\"post in posts\" class=\"list card post-item\">\n        <div class=\"post-heading item item-text-wrap\">\n          <h2 class=\"post-title\" ng-bind-html=\"post.title | rawHtml\"></h2>\n          <p class=\"post-author\">\n            By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n          </p>\n        </div>\n        <div class=\"post-content item item-text-wrap\" post-content>\n          <p class=\"post-excerpt\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></p>\n          <div class=\"post-actions row\">\n            <div class=\"actions col col-center col-66\">\n              <a class=\"button button-icon icon ion-bookmark\" ng-click=\"bookmarkPost(post)\"></a>\n            </div>\n            <div class=\"read-more col col-center col-33\">\n              <a ui-sref=\"app.post({postId: post.id})\" class=\"button button-small button-block button-assertive\">\n                Read more\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Infinit scroll -->\n    <ion-infinite-scroll ng-if=\"moreDataCanBeLoaded()\" on-infinite=\"loadMoreData()\" distance=\"1%\" icon=\"ion-loading-c\">\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/wordpress_post.html","<ion-view class=\"post-view\">\n  <ion-content>\n    <div class=\"post-heading item item-text-wrap\">\n      <h1 class=\"post-title\">{{post.title}}</h1>\n      <p class=\"post-author\">\n        By <span>{{post.author.nickname}}</span> <span am-time-ago=\"post.date\"></span>\n      </p>\n    </div>\n    <div class=\"post-content item item-text-wrap\" post-content>\n      <p class=\"post-text\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></p>\n    </div>\n    <div class=\"post-tags item item-text-wrap\">\n      <span class=\"post-tag button button-small button-outline button-stable\" ng-repeat=\"category in post.categories\">{{category.title}}</span>\n    </div>\n  </ion-content>\n  <ion-footer-bar class=\"post-footer bar bar-footer bar-dark\">\n    <div class=\"row\">\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-plus\" bigger-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon icon-right ion-minus\" smaller-text=\".post-view .post-text\">A</a>\n      </div>\n      <div class=\"col col-20 col-offset-20 col-center\">\n        <a class=\"button button-icon icon ion-heart\"></a>\n      </div>\n      <div class=\"col col-20 col-center\">\n        <a class=\"button button-icon icon ion-android-share-alt\" ng-click=\"sharePost(post.url)\"></a>\n      </div>\n    </div>\n  </ion-footer-bar>\n</ion-view>\n");}]);