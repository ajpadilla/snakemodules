/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Square.js":
/*!***********************!*\
  !*** ./src/Square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Square)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nvar Square = /*#__PURE__*/function () {\n  function Square(x, y) {\n    _classCallCheck(this, Square);\n\n    this.x = x;\n    this.y = y;\n  }\n\n  _createClass(Square, [{\n    key: \"draw\",\n    value: function draw() {}\n  }, {\n    key: \"move\",\n    value: function move(dx, dy) {\n      this.x += dx;\n      this.y += dy;\n    }\n  }, {\n    key: \"checkCollision\",\n    value: function checkCollision(obj) {\n      return this.x === obj.x && this.y === obj.y;\n    }\n  }]);\n\n  return Square;\n}();\n\n\n\n//# sourceURL=webpack://snakemodules/./src/Square.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Square_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Square.js */ \"./src/Square.js\");\n\nconsole.log(\"Iniciando Juego\");\nvar myCanvas = document.getElementById('myCanvas');\nvar context = myCanvas.getContext('2d');\nvar SIZE = 20;\nvar head = new _Square_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0); //{ x: 0, y: 0};\n\nvar body = [];\nvar food = null;\nvar dx = 0;\nvar dy = 0;\nvar lastAxis;\nsetInterval(main, 1000);\n\nfunction main() {\n  update(); // Actualizar las varialbes del juego\n\n  draw(); // dibijar todos los objetos del juego\n}\n\nfunction update() {\n  var collisionDetected = checkSnakeCollision();\n\n  if (collisionDetected) {\n    gameOver();\n    return;\n  } // salvar la posicion previa de la cabeza de la serpiente\n\n\n  var prevX, prevY;\n\n  if (body.length >= 1) {\n    prevX = body[body.length - 1].x; // Solo afecta al body y se queda con la posicion anterio de body[0]\n\n    prevY = body[body.length - 1].y;\n  } else {\n    prevX = head.x; // si no hay body toma la referencia anterio antes de aumentar\n\n    prevY = head.y;\n  } // El cuerpo de la serpiente siga a la cabeza de la serpiente\n\n\n  for (var i = body.length - 1; i >= 1; --i) {\n    body[i].x = body[i - 1].x; // Aumenta la posicion de la fila del body con la ultima posicion del ultimo elemento\n\n    body[i].y = body[i - 1].y;\n  }\n\n  if (body.length >= 1) {\n    body[0].x = head.x; // Aumenta la posicion solo para el body[0]\n\n    body[0].y = head.y;\n  } // Actualizar la coords de la cabeza de la serpiente\n\n\n  head.move(dx, dy); // Evitar el movimiento contrario de la ultima tecla presionada\n\n  if (dx !== 0) {\n    lastAxis = 'X';\n  } else if (dy !== 0) {\n    lastAxis = 'Y';\n  } // detectar si la serpiente ha consumido el alimento\n\n\n  if (food && head.checkCollision(food)) {\n    food = null; // aumentar el tamaño de la serpiente\n\n    increaseSnakeSize(prevX, prevY);\n  } // generar el alimento en caso que no exista\n\n\n  if (!food) {\n    food = randomFootPosition();\n  }\n}\n\nfunction randomFootPosition() {\n  var position;\n\n  do {\n    position = {\n      x: getRandomX(),\n      y: getRandomY()\n    };\n  } while (checkFoodCollision(position));\n\n  return position;\n}\n\nfunction checkFoodCollision(position) {\n  for (var i = 0; i < body.length; i++) {\n    if (body[i].checkCollision(position)) {\n      return true;\n    }\n  }\n\n  if (head.checkCollision(position)) {\n    return true;\n  }\n\n  return false;\n}\n\nfunction checkSnakeCollision() {\n  for (var i = 0; i < body.length; i++) {\n    if (head.x == body[i].x && head.y == body[i].y) {\n      return true;\n    }\n  }\n\n  var topCollision = head.y < 0;\n  var bottonCollision = head.y > 440;\n  var rightCollision = head.x < 0;\n  var leftCollision = head.x > 380;\n\n  if (topCollision || bottonCollision || rightCollision || leftCollision) {\n    return true;\n  }\n\n  return false;\n}\n\nfunction increaseSnakeSize(prevX, prevY) {\n  body.push(new _Square_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](prevX, prevX));\n}\n\nfunction gameOver() {\n  alert(\"Has perdido\");\n  head.x = 0;\n  head.y = 0;\n  dy = 0;\n  dx = 0;\n  body.length = 0;\n}\n\nfunction draw() {\n  //context.clearRect(0, 0, myCanvas.width, myCanvas.height);\n  context.fillStyle = 'black';\n  context.fillRect(0, 0, myCanvas.width, myCanvas.height);\n  drawObject(head, 'lime');\n  body.forEach(function (element) {\n    return drawObject(element, 'line');\n  });\n  drawObject(food, 'white');\n}\n\nfunction getRandomX() {\n  return 20 * parseInt(Math.random() * 20);\n}\n\nfunction getRandomY() {\n  return 20 * parseInt(Math.random() * 23);\n}\n\nfunction drawObject(obj, color) {\n  context.fillStyle = color;\n  context.fillRect(obj.x, obj.y, SIZE, SIZE);\n}\n\ndocument.addEventListener('keydown', moveSnake);\n\nfunction moveSnake(event) {\n  switch (event.key) {\n    case 'ArrowUp':\n      if (lastAxis !== 'Y') {\n        dx = 0;\n        dy = -SIZE;\n        console.log('Mover hacia arriba');\n      }\n\n      break;\n\n    case 'ArrowDown':\n      if (lastAxis !== 'Y') {\n        dx = 0;\n        dy = +SIZE;\n        console.log('Mover hacia abajo');\n      }\n\n      break;\n\n    case 'ArrowRight':\n      if (lastAxis !== 'X') {\n        dx = +SIZE;\n        dy = 0;\n        console.log('Mover hacia la derecha');\n      }\n\n      break;\n\n    case 'ArrowLeft':\n      if (lastAxis !== 'X') {\n        dx = -SIZE;\n        dy = 0;\n        console.log('Mover hacia la izquierda');\n      }\n\n      break;\n  }\n}\n\n//# sourceURL=webpack://snakemodules/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;