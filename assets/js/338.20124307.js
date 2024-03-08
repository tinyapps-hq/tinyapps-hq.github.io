"use strict";
exports.id = 338;
exports.ids = [338];
exports.modules = {

/***/ 35980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ createAnimation)
/* harmony export */ });
/* harmony import */ var _index5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19461);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */



let animationPrefix;
/**
 * Web Animations requires hyphenated CSS properties
 * to be written in camelCase when animating
 */
const processKeyframes = (keyframes) => {
    keyframes.forEach((keyframe) => {
        for (const key in keyframe) {
            // eslint-disable-next-line no-prototype-builtins
            if (keyframe.hasOwnProperty(key)) {
                const value = keyframe[key];
                if (key === 'easing') {
                    const newKey = 'animation-timing-function';
                    keyframe[newKey] = value;
                    delete keyframe[key];
                }
                else {
                    const newKey = convertCamelCaseToHypen(key);
                    if (newKey !== key) {
                        keyframe[newKey] = value;
                        delete keyframe[key];
                    }
                }
            }
        }
    });
    return keyframes;
};
const convertCamelCaseToHypen = (str) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};
const getAnimationPrefix = (el) => {
    if (animationPrefix === undefined) {
        const supportsUnprefixed = el.style.animationName !== undefined;
        const supportsWebkitPrefix = el.style.webkitAnimationName !== undefined;
        animationPrefix = !supportsUnprefixed && supportsWebkitPrefix ? '-webkit-' : '';
    }
    return animationPrefix;
};
const setStyleProperty = (element, propertyName, value) => {
    const prefix = propertyName.startsWith('animation') ? getAnimationPrefix(element) : '';
    element.style.setProperty(prefix + propertyName, value);
};
const removeStyleProperty = (element, propertyName) => {
    const prefix = propertyName.startsWith('animation') ? getAnimationPrefix(element) : '';
    element.style.removeProperty(prefix + propertyName);
};
const animationEnd = (el, callback) => {
    let unRegTrans;
    const opts = { passive: true };
    const unregister = () => {
        if (unRegTrans) {
            unRegTrans();
        }
    };
    const onTransitionEnd = (ev) => {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    };
    if (el) {
        el.addEventListener('webkitAnimationEnd', onTransitionEnd, opts);
        el.addEventListener('animationend', onTransitionEnd, opts);
        unRegTrans = () => {
            el.removeEventListener('webkitAnimationEnd', onTransitionEnd, opts);
            el.removeEventListener('animationend', onTransitionEnd, opts);
        };
    }
    return unregister;
};
// TODO(FW-2832): type
const generateKeyframeRules = (keyframes = []) => {
    return keyframes
        .map((keyframe) => {
        const offset = keyframe.offset;
        const frameString = [];
        for (const property in keyframe) {
            // eslint-disable-next-line no-prototype-builtins
            if (keyframe.hasOwnProperty(property) && property !== 'offset') {
                frameString.push(`${property}: ${keyframe[property]};`);
            }
        }
        return `${offset * 100}% { ${frameString.join(' ')} }`;
    })
        .join(' ');
};
const keyframeIds = [];
const generateKeyframeName = (keyframeRules) => {
    let index = keyframeIds.indexOf(keyframeRules);
    if (index < 0) {
        index = keyframeIds.push(keyframeRules) - 1;
    }
    return `ion-animation-${index}`;
};
const getStyleContainer = (element) => {
    // getRootNode is not always available in SSR environments.
    // TODO(FW-2832): types
    const rootNode = element.getRootNode !== undefined ? element.getRootNode() : element;
    return rootNode.head || rootNode;
};
const createKeyframeStylesheet = (keyframeName, keyframeRules, element) => {
    var _a;
    const styleContainer = getStyleContainer(element);
    const keyframePrefix = getAnimationPrefix(element);
    const existingStylesheet = styleContainer.querySelector('#' + keyframeName);
    if (existingStylesheet) {
        return existingStylesheet;
    }
    const stylesheet = ((_a = element.ownerDocument) !== null && _a !== void 0 ? _a : document).createElement('style');
    stylesheet.id = keyframeName;
    stylesheet.textContent = `@${keyframePrefix}keyframes ${keyframeName} { ${keyframeRules} } @${keyframePrefix}keyframes ${keyframeName}-alt { ${keyframeRules} }`;
    styleContainer.appendChild(stylesheet);
    return stylesheet;
};
const addClassToArray = (classes = [], className) => {
    if (className !== undefined) {
        const classNameToAppend = Array.isArray(className) ? className : [className];
        return [...classes, ...classNameToAppend];
    }
    return classes;
};

const createAnimation = (animationId) => {
    let _delay;
    let _duration;
    let _easing;
    let _iterations;
    let _fill;
    let _direction;
    let _keyframes = [];
    let beforeAddClasses = [];
    let beforeRemoveClasses = [];
    let initialized = false;
    let parentAnimation;
    let beforeStylesValue = {};
    let afterAddClasses = [];
    let afterRemoveClasses = [];
    let afterStylesValue = {};
    let numAnimationsRunning = 0;
    let shouldForceLinearEasing = false;
    let shouldForceSyncPlayback = false;
    let cssAnimationsTimerFallback;
    let forceDirectionValue;
    let forceDurationValue;
    let forceDelayValue;
    let willComplete = true;
    let finished = false;
    let shouldCalculateNumAnimations = true;
    let keyframeName;
    let ani;
    let paused = false;
    const id = animationId;
    const onFinishCallbacks = [];
    const onFinishOneTimeCallbacks = [];
    const onStopOneTimeCallbacks = [];
    const elements = [];
    const childAnimations = [];
    const stylesheets = [];
    const _beforeAddReadFunctions = [];
    const _beforeAddWriteFunctions = [];
    const _afterAddReadFunctions = [];
    const _afterAddWriteFunctions = [];
    const webAnimations = [];
    const supportsAnimationEffect = typeof AnimationEffect === 'function' ||
        (_index5_js__WEBPACK_IMPORTED_MODULE_0__.w !== undefined && typeof _index5_js__WEBPACK_IMPORTED_MODULE_0__.w.AnimationEffect === 'function');
    const supportsWebAnimations = typeof Element === 'function' &&
        typeof Element.prototype.animate === 'function' &&
        supportsAnimationEffect;
    const ANIMATION_END_FALLBACK_PADDING_MS = 100;
    const getWebAnimations = () => {
        return webAnimations;
    };
    const destroy = (clearStyleSheets) => {
        childAnimations.forEach((childAnimation) => {
            childAnimation.destroy(clearStyleSheets);
        });
        cleanUp(clearStyleSheets);
        elements.length = 0;
        childAnimations.length = 0;
        _keyframes.length = 0;
        clearOnFinish();
        initialized = false;
        shouldCalculateNumAnimations = true;
        return ani;
    };
    /**
     * Cancels any Web Animations, removes
     * any animation properties from the
     * animation's elements, and removes the
     * animation's stylesheets from the DOM.
     */
    const cleanUp = (clearStyleSheets) => {
        cleanUpElements();
        if (clearStyleSheets) {
            cleanUpStyleSheets();
        }
    };
    const resetFlags = () => {
        shouldForceLinearEasing = false;
        shouldForceSyncPlayback = false;
        shouldCalculateNumAnimations = true;
        forceDirectionValue = undefined;
        forceDurationValue = undefined;
        forceDelayValue = undefined;
        numAnimationsRunning = 0;
        finished = false;
        willComplete = true;
        paused = false;
    };
    const isRunning = () => {
        return numAnimationsRunning !== 0 && !paused;
    };
    /**
     * @internal
     * Remove a callback from a chosen callback array
     * @param callbackToRemove: A reference to the callback that should be removed
     * @param callbackObjects: An array of callbacks that callbackToRemove should be removed from.
     */
    const clearCallback = (callbackToRemove, callbackObjects) => {
        const index = callbackObjects.findIndex((callbackObject) => callbackObject.c === callbackToRemove);
        if (index > -1) {
            callbackObjects.splice(index, 1);
        }
    };
    /**
     * @internal
     * Add a callback to be fired when an animation is stopped/cancelled.
     * @param callback: A reference to the callback that should be fired
     * @param opts: Any options associated with this particular callback
     */
    const onStop = (callback, opts) => {
        onStopOneTimeCallbacks.push({ c: callback, o: opts });
        return ani;
    };
    const onFinish = (callback, opts) => {
        const callbacks = (opts === null || opts === void 0 ? void 0 : opts.oneTimeCallback) ? onFinishOneTimeCallbacks : onFinishCallbacks;
        callbacks.push({ c: callback, o: opts });
        return ani;
    };
    const clearOnFinish = () => {
        onFinishCallbacks.length = 0;
        onFinishOneTimeCallbacks.length = 0;
        return ani;
    };
    /**
     * Cancels any Web Animations and removes
     * any animation properties from the
     * the animation's elements.
     */
    const cleanUpElements = () => {
        if (supportsWebAnimations) {
            webAnimations.forEach((animation) => {
                animation.cancel();
            });
            webAnimations.length = 0;
        }
        else {
            const elementsArray = elements.slice();
            (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
                elementsArray.forEach((element) => {
                    removeStyleProperty(element, 'animation-name');
                    removeStyleProperty(element, 'animation-duration');
                    removeStyleProperty(element, 'animation-timing-function');
                    removeStyleProperty(element, 'animation-iteration-count');
                    removeStyleProperty(element, 'animation-delay');
                    removeStyleProperty(element, 'animation-play-state');
                    removeStyleProperty(element, 'animation-fill-mode');
                    removeStyleProperty(element, 'animation-direction');
                });
            });
        }
    };
    /**
     * Removes the animation's stylesheets
     * from the DOM.
     */
    const cleanUpStyleSheets = () => {
        stylesheets.forEach((stylesheet) => {
            /**
             * When sharing stylesheets, it's possible
             * for another animation to have already
             * cleaned up a particular stylesheet
             */
            if (stylesheet === null || stylesheet === void 0 ? void 0 : stylesheet.parentNode) {
                stylesheet.parentNode.removeChild(stylesheet);
            }
        });
        stylesheets.length = 0;
    };
    const beforeAddRead = (readFn) => {
        _beforeAddReadFunctions.push(readFn);
        return ani;
    };
    const beforeAddWrite = (writeFn) => {
        _beforeAddWriteFunctions.push(writeFn);
        return ani;
    };
    const afterAddRead = (readFn) => {
        _afterAddReadFunctions.push(readFn);
        return ani;
    };
    const afterAddWrite = (writeFn) => {
        _afterAddWriteFunctions.push(writeFn);
        return ani;
    };
    const beforeAddClass = (className) => {
        beforeAddClasses = addClassToArray(beforeAddClasses, className);
        return ani;
    };
    const beforeRemoveClass = (className) => {
        beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);
        return ani;
    };
    /**
     * Set CSS inline styles to the animation's
     * elements before the animation begins.
     */
    const beforeStyles = (styles = {}) => {
        beforeStylesValue = styles;
        return ani;
    };
    /**
     * Clear CSS inline styles from the animation's
     * elements before the animation begins.
     */
    const beforeClearStyles = (propertyNames = []) => {
        for (const property of propertyNames) {
            beforeStylesValue[property] = '';
        }
        return ani;
    };
    const afterAddClass = (className) => {
        afterAddClasses = addClassToArray(afterAddClasses, className);
        return ani;
    };
    const afterRemoveClass = (className) => {
        afterRemoveClasses = addClassToArray(afterRemoveClasses, className);
        return ani;
    };
    const afterStyles = (styles = {}) => {
        afterStylesValue = styles;
        return ani;
    };
    const afterClearStyles = (propertyNames = []) => {
        for (const property of propertyNames) {
            afterStylesValue[property] = '';
        }
        return ani;
    };
    const getFill = () => {
        if (_fill !== undefined) {
            return _fill;
        }
        if (parentAnimation) {
            return parentAnimation.getFill();
        }
        return 'both';
    };
    const getDirection = () => {
        if (forceDirectionValue !== undefined) {
            return forceDirectionValue;
        }
        if (_direction !== undefined) {
            return _direction;
        }
        if (parentAnimation) {
            return parentAnimation.getDirection();
        }
        return 'normal';
    };
    const getEasing = () => {
        if (shouldForceLinearEasing) {
            return 'linear';
        }
        if (_easing !== undefined) {
            return _easing;
        }
        if (parentAnimation) {
            return parentAnimation.getEasing();
        }
        return 'linear';
    };
    const getDuration = () => {
        if (shouldForceSyncPlayback) {
            return 0;
        }
        if (forceDurationValue !== undefined) {
            return forceDurationValue;
        }
        if (_duration !== undefined) {
            return _duration;
        }
        if (parentAnimation) {
            return parentAnimation.getDuration();
        }
        return 0;
    };
    const getIterations = () => {
        if (_iterations !== undefined) {
            return _iterations;
        }
        if (parentAnimation) {
            return parentAnimation.getIterations();
        }
        return 1;
    };
    const getDelay = () => {
        if (forceDelayValue !== undefined) {
            return forceDelayValue;
        }
        if (_delay !== undefined) {
            return _delay;
        }
        if (parentAnimation) {
            return parentAnimation.getDelay();
        }
        return 0;
    };
    const getKeyframes = () => {
        return _keyframes;
    };
    const direction = (animationDirection) => {
        _direction = animationDirection;
        update(true);
        return ani;
    };
    const fill = (animationFill) => {
        _fill = animationFill;
        update(true);
        return ani;
    };
    const delay = (animationDelay) => {
        _delay = animationDelay;
        update(true);
        return ani;
    };
    const easing = (animationEasing) => {
        _easing = animationEasing;
        update(true);
        return ani;
    };
    const duration = (animationDuration) => {
        /**
         * CSS Animation Durations of 0ms work fine on Chrome
         * but do not run on Safari, so force it to 1ms to
         * get it to run on both platforms.
         */
        if (!supportsWebAnimations && animationDuration === 0) {
            animationDuration = 1;
        }
        _duration = animationDuration;
        update(true);
        return ani;
    };
    const iterations = (animationIterations) => {
        _iterations = animationIterations;
        update(true);
        return ani;
    };
    const parent = (animation) => {
        parentAnimation = animation;
        return ani;
    };
    const addElement = (el) => {
        if (el != null) {
            if (el.nodeType === 1) {
                elements.push(el);
            }
            else if (el.length >= 0) {
                for (let i = 0; i < el.length; i++) {
                    elements.push(el[i]);
                }
            }
            else {
                console.error('Invalid addElement value');
            }
        }
        return ani;
    };
    const addAnimation = (animationToAdd) => {
        if (animationToAdd != null) {
            if (Array.isArray(animationToAdd)) {
                for (const animation of animationToAdd) {
                    animation.parent(ani);
                    childAnimations.push(animation);
                }
            }
            else {
                animationToAdd.parent(ani);
                childAnimations.push(animationToAdd);
            }
        }
        return ani;
    };
    const keyframes = (keyframeValues) => {
        const different = _keyframes !== keyframeValues;
        _keyframes = keyframeValues;
        if (different) {
            updateKeyframes(_keyframes);
        }
        return ani;
    };
    const updateKeyframes = (keyframeValues) => {
        if (supportsWebAnimations) {
            getWebAnimations().forEach((animation) => {
                /**
                 * animation.effect's type is AnimationEffect.
                 * However, in this case we have a more specific
                 * type of AnimationEffect called KeyframeEffect which
                 * inherits from AnimationEffect. As a result,
                 * we cast animation.effect to KeyframeEffect.
                 */
                const keyframeEffect = animation.effect;
                /**
                 * setKeyframes is not supported in all browser
                 * versions that Ionic supports, so we need to
                 * check for support before using it.
                 */
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (keyframeEffect.setKeyframes) {
                    keyframeEffect.setKeyframes(keyframeValues);
                }
                else {
                    const newEffect = new KeyframeEffect(keyframeEffect.target, keyframeValues, keyframeEffect.getTiming());
                    animation.effect = newEffect;
                }
            });
        }
        else {
            initializeCSSAnimation();
        }
    };
    /**
     * Run all "before" animation hooks.
     */
    const beforeAnimation = () => {
        // Runs all before read callbacks
        _beforeAddReadFunctions.forEach((callback) => callback());
        // Runs all before write callbacks
        _beforeAddWriteFunctions.forEach((callback) => callback());
        // Updates styles and classes before animation runs
        const addClasses = beforeAddClasses;
        const removeClasses = beforeRemoveClasses;
        const styles = beforeStylesValue;
        elements.forEach((el) => {
            const elementClassList = el.classList;
            addClasses.forEach((c) => elementClassList.add(c));
            removeClasses.forEach((c) => elementClassList.remove(c));
            for (const property in styles) {
                // eslint-disable-next-line no-prototype-builtins
                if (styles.hasOwnProperty(property)) {
                    setStyleProperty(el, property, styles[property]);
                }
            }
        });
    };
    /**
     * Run all "after" animation hooks.
     */
    const afterAnimation = () => {
        clearCSSAnimationsTimeout();
        // Runs all after read callbacks
        _afterAddReadFunctions.forEach((callback) => callback());
        // Runs all after write callbacks
        _afterAddWriteFunctions.forEach((callback) => callback());
        // Updates styles and classes before animation ends
        const currentStep = willComplete ? 1 : 0;
        const addClasses = afterAddClasses;
        const removeClasses = afterRemoveClasses;
        const styles = afterStylesValue;
        elements.forEach((el) => {
            const elementClassList = el.classList;
            addClasses.forEach((c) => elementClassList.add(c));
            removeClasses.forEach((c) => elementClassList.remove(c));
            for (const property in styles) {
                // eslint-disable-next-line no-prototype-builtins
                if (styles.hasOwnProperty(property)) {
                    setStyleProperty(el, property, styles[property]);
                }
            }
        });
        /**
         * Clean up any value coercion before
         * the user callbacks fire otherwise
         * they may get stale values. For example,
         * if someone calls progressStart(0) the
         * animation may still be reversed.
         */
        forceDurationValue = undefined;
        forceDirectionValue = undefined;
        forceDelayValue = undefined;
        onFinishCallbacks.forEach((onFinishCallback) => {
            return onFinishCallback.c(currentStep, ani);
        });
        onFinishOneTimeCallbacks.forEach((onFinishCallback) => {
            return onFinishCallback.c(currentStep, ani);
        });
        onFinishOneTimeCallbacks.length = 0;
        shouldCalculateNumAnimations = true;
        if (willComplete) {
            finished = true;
        }
        willComplete = true;
    };
    const animationFinish = () => {
        if (numAnimationsRunning === 0) {
            return;
        }
        numAnimationsRunning--;
        if (numAnimationsRunning === 0) {
            afterAnimation();
            if (parentAnimation) {
                parentAnimation.animationFinish();
            }
        }
    };
    const initializeCSSAnimation = (toggleAnimationName = true) => {
        cleanUpStyleSheets();
        const processedKeyframes = processKeyframes(_keyframes);
        elements.forEach((element) => {
            if (processedKeyframes.length > 0) {
                const keyframeRules = generateKeyframeRules(processedKeyframes);
                keyframeName = animationId !== undefined ? animationId : generateKeyframeName(keyframeRules);
                const stylesheet = createKeyframeStylesheet(keyframeName, keyframeRules, element);
                stylesheets.push(stylesheet);
                setStyleProperty(element, 'animation-duration', `${getDuration()}ms`);
                setStyleProperty(element, 'animation-timing-function', getEasing());
                setStyleProperty(element, 'animation-delay', `${getDelay()}ms`);
                setStyleProperty(element, 'animation-fill-mode', getFill());
                setStyleProperty(element, 'animation-direction', getDirection());
                const iterationsCount = getIterations() === Infinity ? 'infinite' : getIterations().toString();
                setStyleProperty(element, 'animation-iteration-count', iterationsCount);
                setStyleProperty(element, 'animation-play-state', 'paused');
                if (toggleAnimationName) {
                    setStyleProperty(element, 'animation-name', `${stylesheet.id}-alt`);
                }
                (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
                    setStyleProperty(element, 'animation-name', stylesheet.id || null);
                });
            }
        });
    };
    const initializeWebAnimation = () => {
        elements.forEach((element) => {
            const animation = element.animate(_keyframes, {
                id,
                delay: getDelay(),
                duration: getDuration(),
                easing: getEasing(),
                iterations: getIterations(),
                fill: getFill(),
                direction: getDirection(),
            });
            animation.pause();
            webAnimations.push(animation);
        });
        if (webAnimations.length > 0) {
            webAnimations[0].onfinish = () => {
                animationFinish();
            };
        }
    };
    const initializeAnimation = (toggleAnimationName = true) => {
        beforeAnimation();
        if (_keyframes.length > 0) {
            if (supportsWebAnimations) {
                initializeWebAnimation();
            }
            else {
                initializeCSSAnimation(toggleAnimationName);
            }
        }
        initialized = true;
    };
    const setAnimationStep = (step) => {
        step = Math.min(Math.max(step, 0), 0.9999);
        if (supportsWebAnimations) {
            webAnimations.forEach((animation) => {
                // When creating the animation the delay is guaranteed to be set to a number.
                animation.currentTime = animation.effect.getComputedTiming().delay + getDuration() * step;
                animation.pause();
            });
        }
        else {
            const animationDuration = `-${getDuration() * step}ms`;
            elements.forEach((element) => {
                if (_keyframes.length > 0) {
                    setStyleProperty(element, 'animation-delay', animationDuration);
                    setStyleProperty(element, 'animation-play-state', 'paused');
                }
            });
        }
    };
    const updateWebAnimation = (step) => {
        webAnimations.forEach((animation) => {
            animation.effect.updateTiming({
                delay: getDelay(),
                duration: getDuration(),
                easing: getEasing(),
                iterations: getIterations(),
                fill: getFill(),
                direction: getDirection(),
            });
        });
        if (step !== undefined) {
            setAnimationStep(step);
        }
    };
    const updateCSSAnimation = (toggleAnimationName = true, step) => {
        (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
            elements.forEach((element) => {
                setStyleProperty(element, 'animation-name', keyframeName || null);
                setStyleProperty(element, 'animation-duration', `${getDuration()}ms`);
                setStyleProperty(element, 'animation-timing-function', getEasing());
                setStyleProperty(element, 'animation-delay', step !== undefined ? `-${step * getDuration()}ms` : `${getDelay()}ms`);
                setStyleProperty(element, 'animation-fill-mode', getFill() || null);
                setStyleProperty(element, 'animation-direction', getDirection() || null);
                const iterationsCount = getIterations() === Infinity ? 'infinite' : getIterations().toString();
                setStyleProperty(element, 'animation-iteration-count', iterationsCount);
                if (toggleAnimationName) {
                    setStyleProperty(element, 'animation-name', `${keyframeName}-alt`);
                }
                (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
                    setStyleProperty(element, 'animation-name', keyframeName || null);
                });
            });
        });
    };
    const update = (deep = false, toggleAnimationName = true, step) => {
        if (deep) {
            childAnimations.forEach((animation) => {
                animation.update(deep, toggleAnimationName, step);
            });
        }
        if (supportsWebAnimations) {
            updateWebAnimation(step);
        }
        else {
            updateCSSAnimation(toggleAnimationName, step);
        }
        return ani;
    };
    const progressStart = (forceLinearEasing = false, step) => {
        childAnimations.forEach((animation) => {
            animation.progressStart(forceLinearEasing, step);
        });
        pauseAnimation();
        shouldForceLinearEasing = forceLinearEasing;
        if (!initialized) {
            initializeAnimation();
        }
        update(false, true, step);
        return ani;
    };
    const progressStep = (step) => {
        childAnimations.forEach((animation) => {
            animation.progressStep(step);
        });
        setAnimationStep(step);
        return ani;
    };
    const progressEnd = (playTo, step, dur) => {
        shouldForceLinearEasing = false;
        childAnimations.forEach((animation) => {
            animation.progressEnd(playTo, step, dur);
        });
        if (dur !== undefined) {
            forceDurationValue = dur;
        }
        finished = false;
        willComplete = true;
        if (playTo === 0) {
            forceDirectionValue = getDirection() === 'reverse' ? 'normal' : 'reverse';
            if (forceDirectionValue === 'reverse') {
                willComplete = false;
            }
            if (supportsWebAnimations) {
                update();
                setAnimationStep(1 - step);
            }
            else {
                forceDelayValue = (1 - step) * getDuration() * -1;
                update(false, false);
            }
        }
        else if (playTo === 1) {
            if (supportsWebAnimations) {
                update();
                setAnimationStep(step);
            }
            else {
                forceDelayValue = step * getDuration() * -1;
                update(false, false);
            }
        }
        if (playTo !== undefined && !parentAnimation) {
            play();
        }
        return ani;
    };
    const pauseAnimation = () => {
        if (initialized) {
            if (supportsWebAnimations) {
                webAnimations.forEach((animation) => {
                    animation.pause();
                });
            }
            else {
                elements.forEach((element) => {
                    setStyleProperty(element, 'animation-play-state', 'paused');
                });
            }
            paused = true;
        }
    };
    const pause = () => {
        childAnimations.forEach((animation) => {
            animation.pause();
        });
        pauseAnimation();
        return ani;
    };
    const onAnimationEndFallback = () => {
        cssAnimationsTimerFallback = undefined;
        animationFinish();
    };
    const clearCSSAnimationsTimeout = () => {
        if (cssAnimationsTimerFallback) {
            clearTimeout(cssAnimationsTimerFallback);
        }
    };
    const playCSSAnimations = () => {
        clearCSSAnimationsTimeout();
        (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
            elements.forEach((element) => {
                if (_keyframes.length > 0) {
                    setStyleProperty(element, 'animation-play-state', 'running');
                }
            });
        });
        if (_keyframes.length === 0 || elements.length === 0) {
            animationFinish();
        }
        else {
            /**
             * This is a catchall in the event that a CSS Animation did not finish.
             * The Web Animations API has mechanisms in place for preventing this.
             * CSS Animations will not fire an `animationend` event
             * for elements with `display: none`. The Web Animations API
             * accounts for this, but using raw CSS Animations requires
             * this workaround.
             */
            const animationDelay = getDelay() || 0;
            const animationDuration = getDuration() || 0;
            const animationIterations = getIterations() || 1;
            // No need to set a timeout when animation has infinite iterations
            if (isFinite(animationIterations)) {
                cssAnimationsTimerFallback = setTimeout(onAnimationEndFallback, animationDelay + animationDuration * animationIterations + ANIMATION_END_FALLBACK_PADDING_MS);
            }
            animationEnd(elements[0], () => {
                clearCSSAnimationsTimeout();
                /**
                 * Ensure that clean up
                 * is always done a frame
                 * before the onFinish handlers
                 * are fired. Otherwise, there
                 * may be flickering if a new
                 * animation is started on the same
                 * element too quickly
                 */
                (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(() => {
                    clearCSSAnimationPlayState();
                    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.r)(animationFinish);
                });
            });
        }
    };
    const clearCSSAnimationPlayState = () => {
        elements.forEach((element) => {
            removeStyleProperty(element, 'animation-duration');
            removeStyleProperty(element, 'animation-delay');
            removeStyleProperty(element, 'animation-play-state');
        });
    };
    const playWebAnimations = () => {
        webAnimations.forEach((animation) => {
            animation.play();
        });
        if (_keyframes.length === 0 || elements.length === 0) {
            animationFinish();
        }
    };
    const resetAnimation = () => {
        if (supportsWebAnimations) {
            setAnimationStep(0);
            updateWebAnimation();
        }
        else {
            updateCSSAnimation();
        }
    };
    const play = (opts) => {
        return new Promise((resolve) => {
            if (opts === null || opts === void 0 ? void 0 : opts.sync) {
                shouldForceSyncPlayback = true;
                onFinish(() => (shouldForceSyncPlayback = false), { oneTimeCallback: true });
            }
            if (!initialized) {
                initializeAnimation();
            }
            if (finished) {
                resetAnimation();
                finished = false;
            }
            if (shouldCalculateNumAnimations) {
                numAnimationsRunning = childAnimations.length + 1;
                shouldCalculateNumAnimations = false;
            }
            /**
             * When one of these callbacks fires we
             * need to clear the other's callback otherwise
             * you can potentially get these callbacks
             * firing multiple times if the play method
             * is subsequently called.
             * Example:
             * animation.play() (onStop and onFinish callbacks are registered)
             * animation.stop() (onStop callback is fired, onFinish is not)
             * animation.play() (onStop and onFinish callbacks are registered)
             * Total onStop callbacks: 1
             * Total onFinish callbacks: 2
             */
            const onStopCallback = () => {
                clearCallback(onFinishCallback, onFinishOneTimeCallbacks);
                resolve();
            };
            const onFinishCallback = () => {
                clearCallback(onStopCallback, onStopOneTimeCallbacks);
                resolve();
            };
            /**
             * The play method resolves when an animation
             * run either finishes or is cancelled.
             */
            onFinish(onFinishCallback, { oneTimeCallback: true });
            onStop(onStopCallback, { oneTimeCallback: true });
            childAnimations.forEach((animation) => {
                animation.play();
            });
            if (supportsWebAnimations) {
                playWebAnimations();
            }
            else {
                playCSSAnimations();
            }
            paused = false;
        });
    };
    /**
     * Stops an animation and resets it state to the
     * beginning. This does not fire any onFinish
     * callbacks because the animation did not finish.
     * However, since the animation was not destroyed
     * (i.e. the animation could run again) we do not
     * clear the onFinish callbacks.
     */
    const stop = () => {
        childAnimations.forEach((animation) => {
            animation.stop();
        });
        if (initialized) {
            cleanUpElements();
            initialized = false;
        }
        resetFlags();
        onStopOneTimeCallbacks.forEach((onStopCallback) => onStopCallback.c(0, ani));
        onStopOneTimeCallbacks.length = 0;
    };
    const from = (property, value) => {
        const firstFrame = _keyframes[0];
        if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
            firstFrame[property] = value;
        }
        else {
            _keyframes = [{ offset: 0, [property]: value }, ..._keyframes];
        }
        return ani;
    };
    const to = (property, value) => {
        const lastFrame = _keyframes[_keyframes.length - 1];
        if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
            lastFrame[property] = value;
        }
        else {
            _keyframes = [..._keyframes, { offset: 1, [property]: value }];
        }
        return ani;
    };
    const fromTo = (property, fromValue, toValue) => {
        return from(property, fromValue).to(property, toValue);
    };
    return (ani = {
        parentAnimation,
        elements,
        childAnimations,
        id,
        animationFinish,
        from,
        to,
        fromTo,
        parent,
        play,
        pause,
        stop,
        destroy,
        keyframes,
        addAnimation,
        addElement,
        update,
        fill,
        direction,
        iterations,
        duration,
        easing,
        delay,
        getWebAnimations,
        getKeyframes,
        getFill,
        getDirection,
        getDelay,
        getIterations,
        getEasing,
        getDuration,
        afterAddRead,
        afterAddWrite,
        afterClearStyles,
        afterStyles,
        afterRemoveClass,
        afterAddClass,
        beforeAddRead,
        beforeAddWrite,
        beforeClearStyles,
        beforeStyles,
        beforeRemoveClass,
        beforeAddClass,
        onFinish,
        isRunning,
        progressStart,
        progressStep,
        progressEnd,
    });
};




/***/ }),

/***/ 56338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iosTransitionAnimation": () => (/* binding */ iosTransitionAnimation),
/* harmony export */   "shadow": () => (/* binding */ shadow)
/* harmony export */ });
/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35980);
/* harmony import */ var _index2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */



const DURATION = 540;
// TODO(FW-2832): types
const getClonedElement = (tagName) => {
    return document.querySelector(`${tagName}.ion-cloned-element`);
};
const shadow = (el) => {
    return el.shadowRoot || el;
};
const getLargeTitle = (refEl) => {
    const tabs = refEl.tagName === 'ION-TABS' ? refEl : refEl.querySelector('ion-tabs');
    const query = 'ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large';
    if (tabs != null) {
        const activeTab = tabs.querySelector('ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)');
        return activeTab != null ? activeTab.querySelector(query) : null;
    }
    return refEl.querySelector(query);
};
const getBackButton = (refEl, backDirection) => {
    const tabs = refEl.tagName === 'ION-TABS' ? refEl : refEl.querySelector('ion-tabs');
    let buttonsList = [];
    if (tabs != null) {
        const activeTab = tabs.querySelector('ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)');
        if (activeTab != null) {
            buttonsList = activeTab.querySelectorAll('ion-buttons');
        }
    }
    else {
        buttonsList = refEl.querySelectorAll('ion-buttons');
    }
    for (const buttons of buttonsList) {
        const parentHeader = buttons.closest('ion-header');
        const activeHeader = parentHeader && !parentHeader.classList.contains('header-collapse-condense-inactive');
        const backButton = buttons.querySelector('ion-back-button');
        const buttonsCollapse = buttons.classList.contains('buttons-collapse');
        const startSlot = buttons.slot === 'start' || buttons.slot === '';
        if (backButton !== null && startSlot && ((buttonsCollapse && activeHeader && backDirection) || !buttonsCollapse)) {
            return backButton;
        }
    }
    return null;
};
const createLargeTitleTransition = (rootAnimation, rtl, backDirection, enteringEl, leavingEl) => {
    const enteringBackButton = getBackButton(enteringEl, backDirection);
    const leavingLargeTitle = getLargeTitle(leavingEl);
    const enteringLargeTitle = getLargeTitle(enteringEl);
    const leavingBackButton = getBackButton(leavingEl, backDirection);
    const shouldAnimationForward = enteringBackButton !== null && leavingLargeTitle !== null && !backDirection;
    const shouldAnimationBackward = enteringLargeTitle !== null && leavingBackButton !== null && backDirection;
    if (shouldAnimationForward) {
        const leavingLargeTitleBox = leavingLargeTitle.getBoundingClientRect();
        const enteringBackButtonBox = enteringBackButton.getBoundingClientRect();
        const enteringBackButtonTextEl = shadow(enteringBackButton).querySelector('.button-text');
        const enteringBackButtonTextBox = enteringBackButtonTextEl.getBoundingClientRect();
        const leavingLargeTitleTextEl = shadow(leavingLargeTitle).querySelector('.toolbar-title');
        const leavingLargeTitleTextBox = leavingLargeTitleTextEl.getBoundingClientRect();
        animateLargeTitle(rootAnimation, rtl, backDirection, leavingLargeTitle, leavingLargeTitleBox, leavingLargeTitleTextBox, enteringBackButtonTextEl, enteringBackButtonTextBox);
        animateBackButton(rootAnimation, rtl, backDirection, enteringBackButton, enteringBackButtonBox, enteringBackButtonTextEl, enteringBackButtonTextBox, leavingLargeTitle, leavingLargeTitleTextBox);
    }
    else if (shouldAnimationBackward) {
        const enteringLargeTitleBox = enteringLargeTitle.getBoundingClientRect();
        const leavingBackButtonBox = leavingBackButton.getBoundingClientRect();
        const leavingBackButtonTextEl = shadow(leavingBackButton).querySelector('.button-text');
        const leavingBackButtonTextBox = leavingBackButtonTextEl.getBoundingClientRect();
        const enteringLargeTitleTextEl = shadow(enteringLargeTitle).querySelector('.toolbar-title');
        const enteringLargeTitleTextBox = enteringLargeTitleTextEl.getBoundingClientRect();
        animateLargeTitle(rootAnimation, rtl, backDirection, enteringLargeTitle, enteringLargeTitleBox, enteringLargeTitleTextBox, leavingBackButtonTextEl, leavingBackButtonTextBox);
        animateBackButton(rootAnimation, rtl, backDirection, leavingBackButton, leavingBackButtonBox, leavingBackButtonTextEl, leavingBackButtonTextBox, enteringLargeTitle, enteringLargeTitleTextBox);
    }
    return {
        forward: shouldAnimationForward,
        backward: shouldAnimationBackward,
    };
};
const animateBackButton = (rootAnimation, rtl, backDirection, backButtonEl, backButtonBox, backButtonTextEl, backButtonTextBox, largeTitleEl, largeTitleTextBox) => {
    var _a, _b;
    const BACK_BUTTON_START_OFFSET = rtl ? `calc(100% - ${backButtonBox.right + 4}px)` : `${backButtonBox.left - 4}px`;
    const TEXT_ORIGIN_X = rtl ? 'right' : 'left';
    const ICON_ORIGIN_X = rtl ? 'left' : 'right';
    const CONTAINER_ORIGIN_X = rtl ? 'right' : 'left';
    /**
     * When the title and back button texts match
     * then they should overlap during the page transition.
     * If the texts do not match up then the back button text scale adjusts
     * to not perfectly match the large title text otherwise the
     * proportions will be incorrect.
     * When the texts match we scale both the width and height to account for
     * font weight differences between the title and back button.
     */
    const doTitleAndButtonTextsMatch = ((_a = backButtonTextEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === ((_b = largeTitleEl.textContent) === null || _b === void 0 ? void 0 : _b.trim());
    const WIDTH_SCALE = largeTitleTextBox.width / backButtonTextBox.width;
    /**
     * We subtract an offset to account for slight sizing/padding
     * differences between the title and the back button.
     */
    const HEIGHT_SCALE = (largeTitleTextBox.height - LARGE_TITLE_SIZE_OFFSET) / backButtonTextBox.height;
    const TEXT_START_SCALE = doTitleAndButtonTextsMatch
        ? `scale(${WIDTH_SCALE}, ${HEIGHT_SCALE})`
        : `scale(${HEIGHT_SCALE})`;
    const TEXT_END_SCALE = 'scale(1)';
    const backButtonIconEl = shadow(backButtonEl).querySelector('ion-icon');
    const backButtonIconBox = backButtonIconEl.getBoundingClientRect();
    /**
     * We need to offset the container by the icon dimensions
     * so that the back button text aligns with the large title
     * text. Otherwise, the back button icon will align with the
     * large title text but the back button text will not.
     */
    const CONTAINER_START_TRANSLATE_X = rtl
        ? `${backButtonIconBox.width / 2 - (backButtonIconBox.right - backButtonBox.right)}px`
        : `${backButtonBox.left - backButtonIconBox.width / 2}px`;
    const CONTAINER_END_TRANSLATE_X = rtl ? `-${window.innerWidth - backButtonBox.right}px` : `${backButtonBox.left}px`;
    /**
     * Back button container should be
     * aligned to the top of the title container
     * so the texts overlap as the back button
     * text begins to fade in.
     */
    const CONTAINER_START_TRANSLATE_Y = `${largeTitleTextBox.top}px`;
    /**
     * The cloned back button should align exactly with the
     * real back button on the entering page otherwise there will
     * be a layout shift.
     */
    const CONTAINER_END_TRANSLATE_Y = `${backButtonBox.top}px`;
    /**
     * In the forward direction, the cloned back button
     * container should translate from over the large title
     * to over the back button. In the backward direction,
     * it should translate from over the back button to over
     * the large title.
     */
    const FORWARD_CONTAINER_KEYFRAMES = [
        { offset: 0, transform: `translate3d(${CONTAINER_START_TRANSLATE_X}, ${CONTAINER_START_TRANSLATE_Y}, 0)` },
        { offset: 1, transform: `translate3d(${CONTAINER_END_TRANSLATE_X}, ${CONTAINER_END_TRANSLATE_Y}, 0)` },
    ];
    const BACKWARD_CONTAINER_KEYFRAMES = [
        { offset: 0, transform: `translate3d(${CONTAINER_END_TRANSLATE_X}, ${CONTAINER_END_TRANSLATE_Y}, 0)` },
        { offset: 1, transform: `translate3d(${CONTAINER_START_TRANSLATE_X}, ${CONTAINER_START_TRANSLATE_Y}, 0)` },
    ];
    const CONTAINER_KEYFRAMES = backDirection ? BACKWARD_CONTAINER_KEYFRAMES : FORWARD_CONTAINER_KEYFRAMES;
    /**
     * In the forward direction, the text in the cloned back button
     * should start to be (roughly) the size of the large title
     * and then scale down to be the size of the actual back button.
     * The text should also translate, but that translate is handled
     * by the container keyframes.
     */
    const FORWARD_TEXT_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: TEXT_START_SCALE },
        { offset: 1, opacity: 1, transform: TEXT_END_SCALE },
    ];
    const BACKWARD_TEXT_KEYFRAMES = [
        { offset: 0, opacity: 1, transform: TEXT_END_SCALE },
        { offset: 1, opacity: 0, transform: TEXT_START_SCALE },
    ];
    const TEXT_KEYFRAMES = backDirection ? BACKWARD_TEXT_KEYFRAMES : FORWARD_TEXT_KEYFRAMES;
    /**
     * The icon should scale in/out in the second
     * half of the animation. The icon should also
     * translate, but that translate is handled by the
     * container keyframes.
     */
    const FORWARD_ICON_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: 'scale(0.6)' },
        { offset: 0.6, opacity: 0, transform: 'scale(0.6)' },
        { offset: 1, opacity: 1, transform: 'scale(1)' },
    ];
    const BACKWARD_ICON_KEYFRAMES = [
        { offset: 0, opacity: 1, transform: 'scale(1)' },
        { offset: 0.2, opacity: 0, transform: 'scale(0.6)' },
        { offset: 1, opacity: 0, transform: 'scale(0.6)' },
    ];
    const ICON_KEYFRAMES = backDirection ? BACKWARD_ICON_KEYFRAMES : FORWARD_ICON_KEYFRAMES;
    const enteringBackButtonTextAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
    const enteringBackButtonIconAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
    const enteringBackButtonAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
    const clonedBackButtonEl = getClonedElement('ion-back-button');
    const clonedBackButtonTextEl = shadow(clonedBackButtonEl).querySelector('.button-text');
    const clonedBackButtonIconEl = shadow(clonedBackButtonEl).querySelector('ion-icon');
    clonedBackButtonEl.text = backButtonEl.text;
    clonedBackButtonEl.mode = backButtonEl.mode;
    clonedBackButtonEl.icon = backButtonEl.icon;
    clonedBackButtonEl.color = backButtonEl.color;
    clonedBackButtonEl.disabled = backButtonEl.disabled;
    clonedBackButtonEl.style.setProperty('display', 'block');
    clonedBackButtonEl.style.setProperty('position', 'fixed');
    enteringBackButtonIconAnimation.addElement(clonedBackButtonIconEl);
    enteringBackButtonTextAnimation.addElement(clonedBackButtonTextEl);
    enteringBackButtonAnimation.addElement(clonedBackButtonEl);
    enteringBackButtonAnimation
        .beforeStyles({
        position: 'absolute',
        top: '0px',
        [CONTAINER_ORIGIN_X]: '0px',
    })
        .keyframes(CONTAINER_KEYFRAMES);
    enteringBackButtonTextAnimation
        .beforeStyles({
        'transform-origin': `${TEXT_ORIGIN_X} top`,
    })
        .beforeAddWrite(() => {
        backButtonEl.style.setProperty('display', 'none');
        clonedBackButtonEl.style.setProperty(TEXT_ORIGIN_X, BACK_BUTTON_START_OFFSET);
    })
        .afterAddWrite(() => {
        backButtonEl.style.setProperty('display', '');
        clonedBackButtonEl.style.setProperty('display', 'none');
        clonedBackButtonEl.style.removeProperty(TEXT_ORIGIN_X);
    })
        .keyframes(TEXT_KEYFRAMES);
    enteringBackButtonIconAnimation
        .beforeStyles({
        'transform-origin': `${ICON_ORIGIN_X} center`,
    })
        .keyframes(ICON_KEYFRAMES);
    rootAnimation.addAnimation([
        enteringBackButtonTextAnimation,
        enteringBackButtonIconAnimation,
        enteringBackButtonAnimation,
    ]);
};
const animateLargeTitle = (rootAnimation, rtl, backDirection, largeTitleEl, largeTitleBox, largeTitleTextBox, backButtonTextEl, backButtonTextBox) => {
    var _a, _b;
    /**
     * The horizontal transform origin for the large title
     */
    const ORIGIN_X = rtl ? 'right' : 'left';
    const TITLE_START_OFFSET = rtl ? `calc(100% - ${largeTitleBox.right}px)` : `${largeTitleBox.left}px`;
    /**
     * The cloned large should align exactly with the
     * real large title on the leaving page otherwise there will
     * be a layout shift.
     */
    const START_TRANSLATE_X = '0px';
    const START_TRANSLATE_Y = `${largeTitleBox.top}px`;
    /**
     * How much to offset the large title translation by.
     * This accounts for differences in sizing between the large
     * title and the back button due to padding and font weight.
     */
    const LARGE_TITLE_TRANSLATION_OFFSET = 8;
    /**
     * The scaled title should (roughly) overlap the back button.
     * This ensures that the back button and title overlap during
     * the animation. Note that since both elements either fade in
     * or fade out over the course of the animation, neither element
     * will be fully visible on top of the other. As a result, the overlap
     * does not need to be perfect, so approximate values are acceptable here.
     */
    const END_TRANSLATE_X = rtl
        ? `-${window.innerWidth - backButtonTextBox.right - LARGE_TITLE_TRANSLATION_OFFSET}px`
        : `${backButtonTextBox.x - LARGE_TITLE_TRANSLATION_OFFSET}px`;
    /**
     * The top of the scaled large title
     * should match with the top of the
     * back button text element.
     * We subtract 2px to account for the top padding
     * on the large title element.
     */
    const LARGE_TITLE_TOP_PADDING = 2;
    const END_TRANSLATE_Y = `${backButtonTextBox.y - LARGE_TITLE_TOP_PADDING}px`;
    /**
     * In the forward direction, the large title should start at its
     * normal size and then scale down to be (roughly) the size of the
     * back button on the other view. In the backward direction, the
     * large title should start at (roughly) the size of the back button
     * and then scale up to its original size.
     *
     * Note that since both elements either fade in
     * or fade out over the course of the animation, neither element
     * will be fully visible on top of the other. As a result, the overlap
     * does not need to be perfect, so approximate values are acceptable here.
     */
    /**
     * When the title and back button texts match
     * then they should overlap during the page transition.
     * If the texts do not match up then the large title text scale adjusts
     * to not perfectly match the back button text otherwise the
     * proportions will be incorrect.
     * When the texts match we scale both the width and height to account for
     * font weight differences between the title and back button.
     */
    const doTitleAndButtonTextsMatch = ((_a = backButtonTextEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === ((_b = largeTitleEl.textContent) === null || _b === void 0 ? void 0 : _b.trim());
    const WIDTH_SCALE = backButtonTextBox.width / largeTitleTextBox.width;
    const HEIGHT_SCALE = backButtonTextBox.height / (largeTitleTextBox.height - LARGE_TITLE_SIZE_OFFSET);
    const START_SCALE = 'scale(1)';
    const END_SCALE = doTitleAndButtonTextsMatch ? `scale(${WIDTH_SCALE}, ${HEIGHT_SCALE})` : `scale(${HEIGHT_SCALE})`;
    const BACKWARDS_KEYFRAMES = [
        { offset: 0, opacity: 0, transform: `translate3d(${END_TRANSLATE_X}, ${END_TRANSLATE_Y}, 0) ${END_SCALE}` },
        { offset: 0.1, opacity: 0 },
        { offset: 1, opacity: 1, transform: `translate3d(${START_TRANSLATE_X}, ${START_TRANSLATE_Y}, 0) ${START_SCALE}` },
    ];
    const FORWARDS_KEYFRAMES = [
        {
            offset: 0,
            opacity: 0.99,
            transform: `translate3d(${START_TRANSLATE_X}, ${START_TRANSLATE_Y}, 0) ${START_SCALE}`,
        },
        { offset: 0.6, opacity: 0 },
        { offset: 1, opacity: 0, transform: `translate3d(${END_TRANSLATE_X}, ${END_TRANSLATE_Y}, 0) ${END_SCALE}` },
    ];
    const KEYFRAMES = backDirection ? BACKWARDS_KEYFRAMES : FORWARDS_KEYFRAMES;
    const clonedTitleEl = getClonedElement('ion-title');
    const clonedLargeTitleAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
    clonedTitleEl.innerText = largeTitleEl.innerText;
    clonedTitleEl.size = largeTitleEl.size;
    clonedTitleEl.color = largeTitleEl.color;
    clonedLargeTitleAnimation.addElement(clonedTitleEl);
    clonedLargeTitleAnimation
        .beforeStyles({
        'transform-origin': `${ORIGIN_X} top`,
        /**
         * Since font size changes will cause
         * the dimension of the large title to change
         * we need to set the cloned title height
         * equal to that of the original large title height.
         */
        height: `${largeTitleBox.height}px`,
        display: '',
        position: 'relative',
        [ORIGIN_X]: TITLE_START_OFFSET,
    })
        .beforeAddWrite(() => {
        largeTitleEl.style.setProperty('opacity', '0');
    })
        .afterAddWrite(() => {
        largeTitleEl.style.setProperty('opacity', '');
        clonedTitleEl.style.setProperty('display', 'none');
    })
        .keyframes(KEYFRAMES);
    rootAnimation.addAnimation(clonedLargeTitleAnimation);
};
const iosTransitionAnimation = (navEl, opts) => {
    var _a;
    try {
        const EASING = 'cubic-bezier(0.32,0.72,0,1)';
        const OPACITY = 'opacity';
        const TRANSFORM = 'transform';
        const CENTER = '0%';
        const OFF_OPACITY = 0.8;
        const isRTL = navEl.ownerDocument.dir === 'rtl';
        const OFF_RIGHT = isRTL ? '-99.5%' : '99.5%';
        const OFF_LEFT = isRTL ? '33%' : '-33%';
        const enteringEl = opts.enteringEl;
        const leavingEl = opts.leavingEl;
        const backDirection = opts.direction === 'back';
        const contentEl = enteringEl.querySelector(':scope > ion-content');
        const headerEls = enteringEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *');
        const enteringToolBarEls = enteringEl.querySelectorAll(':scope > ion-header > ion-toolbar');
        const rootAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
        const enteringContentAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
        rootAnimation
            .addElement(enteringEl)
            .duration(((_a = opts.duration) !== null && _a !== void 0 ? _a : 0) || DURATION)
            .easing(opts.easing || EASING)
            .fill('both')
            .beforeRemoveClass('ion-page-invisible');
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (leavingEl && navEl !== null && navEl !== undefined) {
            const navDecorAnimation = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            navDecorAnimation.addElement(navEl);
            rootAnimation.addAnimation(navDecorAnimation);
        }
        if (!contentEl && enteringToolBarEls.length === 0 && headerEls.length === 0) {
            enteringContentAnimation.addElement(enteringEl.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs')); // REVIEW
        }
        else {
            enteringContentAnimation.addElement(contentEl); // REVIEW
            enteringContentAnimation.addElement(headerEls);
        }
        rootAnimation.addAnimation(enteringContentAnimation);
        if (backDirection) {
            enteringContentAnimation
                .beforeClearStyles([OPACITY])
                .fromTo('transform', `translateX(${OFF_LEFT})`, `translateX(${CENTER})`)
                .fromTo(OPACITY, OFF_OPACITY, 1);
        }
        else {
            // entering content, forward direction
            enteringContentAnimation
                .beforeClearStyles([OPACITY])
                .fromTo('transform', `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`);
        }
        if (contentEl) {
            const enteringTransitionEffectEl = shadow(contentEl).querySelector('.transition-effect');
            if (enteringTransitionEffectEl) {
                const enteringTransitionCoverEl = enteringTransitionEffectEl.querySelector('.transition-cover');
                const enteringTransitionShadowEl = enteringTransitionEffectEl.querySelector('.transition-shadow');
                const enteringTransitionEffect = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                const enteringTransitionCover = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                const enteringTransitionShadow = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                enteringTransitionEffect
                    .addElement(enteringTransitionEffectEl)
                    .beforeStyles({ opacity: '1', display: 'block' })
                    .afterStyles({ opacity: '', display: '' });
                enteringTransitionCover
                    .addElement(enteringTransitionCoverEl) // REVIEW
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, 0, 0.1);
                enteringTransitionShadow
                    .addElement(enteringTransitionShadowEl) // REVIEW
                    .beforeClearStyles([OPACITY])
                    .fromTo(OPACITY, 0.03, 0.7);
                enteringTransitionEffect.addAnimation([enteringTransitionCover, enteringTransitionShadow]);
                enteringContentAnimation.addAnimation([enteringTransitionEffect]);
            }
        }
        const enteringContentHasLargeTitle = enteringEl.querySelector('ion-header.header-collapse-condense');
        const { forward, backward } = createLargeTitleTransition(rootAnimation, isRTL, backDirection, enteringEl, leavingEl);
        enteringToolBarEls.forEach((enteringToolBarEl) => {
            const enteringToolBar = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            enteringToolBar.addElement(enteringToolBarEl);
            rootAnimation.addAnimation(enteringToolBar);
            const enteringTitle = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            enteringTitle.addElement(enteringToolBarEl.querySelector('ion-title')); // REVIEW
            const enteringToolBarButtons = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            const buttons = Array.from(enteringToolBarEl.querySelectorAll('ion-buttons,[menuToggle]'));
            const parentHeader = enteringToolBarEl.closest('ion-header');
            const inactiveHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.classList.contains('header-collapse-condense-inactive');
            let buttonsToAnimate;
            if (backDirection) {
                buttonsToAnimate = buttons.filter((button) => {
                    const isCollapseButton = button.classList.contains('buttons-collapse');
                    return (isCollapseButton && !inactiveHeader) || !isCollapseButton;
                });
            }
            else {
                buttonsToAnimate = buttons.filter((button) => !button.classList.contains('buttons-collapse'));
            }
            enteringToolBarButtons.addElement(buttonsToAnimate);
            const enteringToolBarItems = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            enteringToolBarItems.addElement(enteringToolBarEl.querySelectorAll(':scope > *:not(ion-title):not(ion-buttons):not([menuToggle])'));
            const enteringToolBarBg = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            enteringToolBarBg.addElement(shadow(enteringToolBarEl).querySelector('.toolbar-background')); // REVIEW
            const enteringBackButton = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            const backButtonEl = enteringToolBarEl.querySelector('ion-back-button');
            if (backButtonEl) {
                enteringBackButton.addElement(backButtonEl);
            }
            enteringToolBar.addAnimation([
                enteringTitle,
                enteringToolBarButtons,
                enteringToolBarItems,
                enteringToolBarBg,
                enteringBackButton,
            ]);
            enteringToolBarButtons.fromTo(OPACITY, 0.01, 1);
            enteringToolBarItems.fromTo(OPACITY, 0.01, 1);
            if (backDirection) {
                if (!inactiveHeader) {
                    enteringTitle
                        .fromTo('transform', `translateX(${OFF_LEFT})`, `translateX(${CENTER})`)
                        .fromTo(OPACITY, 0.01, 1);
                }
                enteringToolBarItems.fromTo('transform', `translateX(${OFF_LEFT})`, `translateX(${CENTER})`);
                // back direction, entering page has a back button
                enteringBackButton.fromTo(OPACITY, 0.01, 1);
            }
            else {
                // entering toolbar, forward direction
                if (!enteringContentHasLargeTitle) {
                    enteringTitle
                        .fromTo('transform', `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`)
                        .fromTo(OPACITY, 0.01, 1);
                }
                enteringToolBarItems.fromTo('transform', `translateX(${OFF_RIGHT})`, `translateX(${CENTER})`);
                enteringToolBarBg.beforeClearStyles([OPACITY, 'transform']);
                const translucentHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.translucent;
                if (!translucentHeader) {
                    enteringToolBarBg.fromTo(OPACITY, 0.01, 'var(--opacity)');
                }
                else {
                    enteringToolBarBg.fromTo('transform', isRTL ? 'translateX(-100%)' : 'translateX(100%)', 'translateX(0px)');
                }
                // forward direction, entering page has a back button
                if (!forward) {
                    enteringBackButton.fromTo(OPACITY, 0.01, 1);
                }
                if (backButtonEl && !forward) {
                    const enteringBackBtnText = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                    enteringBackBtnText
                        .addElement(shadow(backButtonEl).querySelector('.button-text')) // REVIEW
                        .fromTo(`transform`, isRTL ? 'translateX(-100px)' : 'translateX(100px)', 'translateX(0px)');
                    enteringToolBar.addAnimation(enteringBackBtnText);
                }
            }
        });
        // setup leaving view
        if (leavingEl) {
            const leavingContent = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
            const leavingContentEl = leavingEl.querySelector(':scope > ion-content');
            const leavingToolBarEls = leavingEl.querySelectorAll(':scope > ion-header > ion-toolbar');
            const leavingHeaderEls = leavingEl.querySelectorAll(':scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *');
            if (!leavingContentEl && leavingToolBarEls.length === 0 && leavingHeaderEls.length === 0) {
                leavingContent.addElement(leavingEl.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs')); // REVIEW
            }
            else {
                leavingContent.addElement(leavingContentEl); // REVIEW
                leavingContent.addElement(leavingHeaderEls);
            }
            rootAnimation.addAnimation(leavingContent);
            if (backDirection) {
                // leaving content, back direction
                leavingContent
                    .beforeClearStyles([OPACITY])
                    .fromTo('transform', `translateX(${CENTER})`, isRTL ? 'translateX(-100%)' : 'translateX(100%)');
                const leavingPage = (0,_index2_js__WEBPACK_IMPORTED_MODULE_1__.g)(leavingEl);
                rootAnimation.afterAddWrite(() => {
                    if (rootAnimation.getDirection() === 'normal') {
                        leavingPage.style.setProperty('display', 'none');
                    }
                });
            }
            else {
                // leaving content, forward direction
                leavingContent
                    .fromTo('transform', `translateX(${CENTER})`, `translateX(${OFF_LEFT})`)
                    .fromTo(OPACITY, 1, OFF_OPACITY);
            }
            if (leavingContentEl) {
                const leavingTransitionEffectEl = shadow(leavingContentEl).querySelector('.transition-effect');
                if (leavingTransitionEffectEl) {
                    const leavingTransitionCoverEl = leavingTransitionEffectEl.querySelector('.transition-cover');
                    const leavingTransitionShadowEl = leavingTransitionEffectEl.querySelector('.transition-shadow');
                    const leavingTransitionEffect = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                    const leavingTransitionCover = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                    const leavingTransitionShadow = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                    leavingTransitionEffect
                        .addElement(leavingTransitionEffectEl)
                        .beforeStyles({ opacity: '1', display: 'block' })
                        .afterStyles({ opacity: '', display: '' });
                    leavingTransitionCover
                        .addElement(leavingTransitionCoverEl) // REVIEW
                        .beforeClearStyles([OPACITY])
                        .fromTo(OPACITY, 0.1, 0);
                    leavingTransitionShadow
                        .addElement(leavingTransitionShadowEl) // REVIEW
                        .beforeClearStyles([OPACITY])
                        .fromTo(OPACITY, 0.7, 0.03);
                    leavingTransitionEffect.addAnimation([leavingTransitionCover, leavingTransitionShadow]);
                    leavingContent.addAnimation([leavingTransitionEffect]);
                }
            }
            leavingToolBarEls.forEach((leavingToolBarEl) => {
                const leavingToolBar = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                leavingToolBar.addElement(leavingToolBarEl);
                const leavingTitle = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                leavingTitle.addElement(leavingToolBarEl.querySelector('ion-title')); // REVIEW
                const leavingToolBarButtons = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                const buttons = leavingToolBarEl.querySelectorAll('ion-buttons,[menuToggle]');
                const parentHeader = leavingToolBarEl.closest('ion-header');
                const inactiveHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.classList.contains('header-collapse-condense-inactive');
                const buttonsToAnimate = Array.from(buttons).filter((button) => {
                    const isCollapseButton = button.classList.contains('buttons-collapse');
                    return (isCollapseButton && !inactiveHeader) || !isCollapseButton;
                });
                leavingToolBarButtons.addElement(buttonsToAnimate);
                const leavingToolBarItems = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                const leavingToolBarItemEls = leavingToolBarEl.querySelectorAll(':scope > *:not(ion-title):not(ion-buttons):not([menuToggle])');
                if (leavingToolBarItemEls.length > 0) {
                    leavingToolBarItems.addElement(leavingToolBarItemEls);
                }
                const leavingToolBarBg = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                leavingToolBarBg.addElement(shadow(leavingToolBarEl).querySelector('.toolbar-background')); // REVIEW
                const leavingBackButton = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                const backButtonEl = leavingToolBarEl.querySelector('ion-back-button');
                if (backButtonEl) {
                    leavingBackButton.addElement(backButtonEl);
                }
                leavingToolBar.addAnimation([
                    leavingTitle,
                    leavingToolBarButtons,
                    leavingToolBarItems,
                    leavingBackButton,
                    leavingToolBarBg,
                ]);
                rootAnimation.addAnimation(leavingToolBar);
                // fade out leaving toolbar items
                leavingBackButton.fromTo(OPACITY, 0.99, 0);
                leavingToolBarButtons.fromTo(OPACITY, 0.99, 0);
                leavingToolBarItems.fromTo(OPACITY, 0.99, 0);
                if (backDirection) {
                    if (!inactiveHeader) {
                        // leaving toolbar, back direction
                        leavingTitle
                            .fromTo('transform', `translateX(${CENTER})`, isRTL ? 'translateX(-100%)' : 'translateX(100%)')
                            .fromTo(OPACITY, 0.99, 0);
                    }
                    leavingToolBarItems.fromTo('transform', `translateX(${CENTER})`, isRTL ? 'translateX(-100%)' : 'translateX(100%)');
                    leavingToolBarBg.beforeClearStyles([OPACITY, 'transform']);
                    // leaving toolbar, back direction, and there's no entering toolbar
                    // should just slide out, no fading out
                    const translucentHeader = parentHeader === null || parentHeader === void 0 ? void 0 : parentHeader.translucent;
                    if (!translucentHeader) {
                        leavingToolBarBg.fromTo(OPACITY, 'var(--opacity)', 0);
                    }
                    else {
                        leavingToolBarBg.fromTo('transform', 'translateX(0px)', isRTL ? 'translateX(-100%)' : 'translateX(100%)');
                    }
                    if (backButtonEl && !backward) {
                        const leavingBackBtnText = (0,_animation_js__WEBPACK_IMPORTED_MODULE_0__.c)();
                        leavingBackBtnText
                            .addElement(shadow(backButtonEl).querySelector('.button-text')) // REVIEW
                            .fromTo('transform', `translateX(${CENTER})`, `translateX(${(isRTL ? -124 : 124) + 'px'})`);
                        leavingToolBar.addAnimation(leavingBackBtnText);
                    }
                }
                else {
                    // leaving toolbar, forward direction
                    if (!inactiveHeader) {
                        leavingTitle
                            .fromTo('transform', `translateX(${CENTER})`, `translateX(${OFF_LEFT})`)
                            .fromTo(OPACITY, 0.99, 0)
                            .afterClearStyles([TRANSFORM, OPACITY]);
                    }
                    leavingToolBarItems
                        .fromTo('transform', `translateX(${CENTER})`, `translateX(${OFF_LEFT})`)
                        .afterClearStyles([TRANSFORM, OPACITY]);
                    leavingBackButton.afterClearStyles([OPACITY]);
                    leavingTitle.afterClearStyles([OPACITY]);
                    leavingToolBarButtons.afterClearStyles([OPACITY]);
                }
            });
        }
        return rootAnimation;
    }
    catch (err) {
        throw err;
    }
};
/**
 * The scale of the back button during the animation
 * is computed based on the scale of the large title
 * and vice versa. However, we need to account for slight
 * variations in the size of the large title due to
 * padding and font weight. This value should be used to subtract
 * a small amount from the large title height when computing scales
 * to get more accurate scale results.
 */
const LARGE_TITLE_SIZE_OFFSET = 10;




/***/ })

};
;