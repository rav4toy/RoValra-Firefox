/*!
 * rovalra v2.4.10
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
(function() {
  "use strict";
  const CONFIG = {
    RADIUS: 1.5,
    MIN_ZOOM: -2.5,
    MAX_ZOOM: -15,
    AUTO_ROTATE_SPEED: 5e-4,
    FOV_FACTOR: 0.8284,
    Z_NEAR: 0.1,
    Z_FAR: 100,
    PRERENDER_W: 0.1
  }, CONSTANTS = {
    DEG_TO_RAD: 0.01745329251,
    PI_2: 6.28318530718,
    COL_OCEAN: new Float32Array([0.345, 0.345, 0.345, 1])
  };
  let gl = null, ctx = null, program = null, locations = {}, sphereBuffer = null, mapTexture = null, easterEggTexture = null, serverCountsData = {}, markers = [];
  const input = {
    rotation: { x: 0.2, y: -1.5 },
    momentum: { x: 0, y: 0 },
    cameraZ: -5,
    mouse: { x: 0, y: 0 },
    dragStart: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    isDragging: !1,
    hasMovedDuringClick: !1,
    isHoveringGlobe: !1,
    hoveredRegion: null,
    easterEggActive: !1,
    isExternallyClosed: !1
  }, MAT_IDENTITY = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), matrices = {
    model: new Float32Array(16),
    view: new Float32Array(16),
    proj: new Float32Array(16),
    mvp: new Float32Array(16)
  }, SHADERS = {
    VS: `
            attribute vec3 aPosition;
            attribute vec2 aTexCoord;
            uniform mat4 uModel;
            uniform mat4 uView;
            uniform mat4 uProjection;
            varying highp vec2 vTexCoord;
            void main() {
                gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
                vTexCoord = aTexCoord;
            }
        `,
    FS: `
            precision mediump float;
            varying highp vec2 vTexCoord;
            uniform sampler2D uSampler;
            uniform vec4 uOceanColor;
            void main() {
                vec4 texColor = texture2D(uSampler, vTexCoord);
                gl_FragColor = mix(uOceanColor, texColor, texColor.a);
            }
        `
  }, Mat4 = {
    perspective: /* @__PURE__ */ __name((out, fovy, aspect, near, far) => {
      const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
      out.fill(0), out[0] = f / aspect, out[5] = f, out[10] = (far + near) * nf, out[11] = -1, out[14] = 2 * far * near * nf;
    }, "perspective"),
    identity: /* @__PURE__ */ __name((out) => out.set(MAT_IDENTITY), "identity"),
    rotateX: /* @__PURE__ */ __name((out, rad) => {
      const s = Math.sin(rad), c = Math.cos(rad), a10 = out[4], a11 = out[5], a12 = out[6], a13 = out[7], a20 = out[8], a21 = out[9], a22 = out[10], a23 = out[11];
      out[4] = a10 * c + a20 * s, out[5] = a11 * c + a21 * s, out[6] = a12 * c + a22 * s, out[7] = a13 * c + a23 * s, out[8] = a20 * c - a10 * s, out[9] = a21 * c - a11 * s, out[10] = a22 * c - a12 * s, out[11] = a23 * c - a13 * s;
    }, "rotateX"),
    rotateY: /* @__PURE__ */ __name((out, rad) => {
      const s = Math.sin(rad), c = Math.cos(rad), a00 = out[0], a01 = out[1], a02 = out[2], a03 = out[3], a20 = out[8], a21 = out[9], a22 = out[10], a23 = out[11];
      out[0] = a00 * c - a20 * s, out[1] = a01 * c - a21 * s, out[2] = a02 * c - a22 * s, out[3] = a03 * c - a23 * s, out[8] = a00 * s + a20 * c, out[9] = a01 * s + a21 * c, out[10] = a02 * s + a22 * c, out[11] = a03 * s + a23 * c;
    }, "rotateY"),
    translateZ: /* @__PURE__ */ __name((out, z) => {
      out[12] += out[8] * z, out[13] += out[9] * z, out[14] += out[10] * z, out[15] += out[11] * z;
    }, "translateZ"),
    multiply: /* @__PURE__ */ __name((out, a, b) => {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33, b0 = b[4], b1 = b[5], b2 = b[6], b3 = b[7], out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33, b0 = b[8], b1 = b[9], b2 = b[10], b3 = b[11], out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33, b0 = b[12], b1 = b[13], b2 = b[14], b3 = b[15], out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30, out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31, out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32, out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }, "multiply")
  };
  function latLonToVector3(lat, lon, r) {
    const phi = lat * CONSTANTS.DEG_TO_RAD, theta = (lon + 180) * CONSTANTS.DEG_TO_RAD, cosPhi = Math.cos(phi);
    return {
      x: -(cosPhi * Math.cos(theta)) * r,
      y: Math.sin(phi) * r,
      z: cosPhi * Math.sin(theta) * r
    };
  }
  __name(latLonToVector3, "latLonToVector3"), document.addEventListener("initRovalraGlobe", (e) => {
    const { REGIONS, serverCounts, mapUrl } = e.detail;
    input.isExternallyClosed = !1, serverCountsData = serverCounts || {};
    const container = document.getElementById("rovalra-globe-container");
    if (!container) return;
    container.innerHTML = "", container.style.cssText = "position: relative; overflow: hidden;";
    const canvasGL = createCanvas(container, 1), canvas2D = createCanvas(container, 2);
    if (canvas2D.style.cursor = "grab", gl = canvasGL.getContext("webgl", { alpha: !0, antialias: !0 }) || canvasGL.getContext("experimental-webgl"), !gl) return console.error("RoValra: WebGL not supported");
    gl.enable(gl.DEPTH_TEST), gl.depthFunc(gl.LEQUAL), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), program = createProgram(gl, SHADERS.VS, SHADERS.FS), gl.useProgram(program), locations = {
      model: gl.getUniformLocation(program, "uModel"),
      view: gl.getUniformLocation(program, "uView"),
      proj: gl.getUniformLocation(program, "uProjection"),
      oceanCol: gl.getUniformLocation(program, "uOceanColor"),
      sampler: gl.getUniformLocation(program, "uSampler"),
      pos: gl.getAttribLocation(program, "aPosition"),
      tex: gl.getAttribLocation(program, "aTexCoord")
    }, gl.enableVertexAttribArray(locations.pos), gl.enableVertexAttribArray(locations.tex), mapTexture = loadTexture(gl, mapUrl);
    const sphereGeo = createBaseSphere(CONFIG.RADIUS, 128);
    if (sphereBuffer = {
      pos: createBuffer(gl, sphereGeo.positions, gl.ARRAY_BUFFER),
      uv: createBuffer(gl, sphereGeo.uvs, gl.ARRAY_BUFFER),
      idx: createBuffer(gl, sphereGeo.indices, gl.ELEMENT_ARRAY_BUFFER),
      count: sphereGeo.indices.length
    }, ctx = canvas2D.getContext("2d", { alpha: !0 }), markers = [], REGIONS) {
      const mRad = CONFIG.RADIUS * 1.003;
      Object.values(REGIONS).forEach((continent) => {
        Object.entries(continent).forEach(([code, region]) => {
          if (region.coords) {
            const p = latLonToVector3(region.coords.lat, region.coords.lon, mRad);
            markers.push({
              x: p.x,
              y: p.y,
              z: p.z,
              code,
              city: region.city,
              country: region.country,
              hasServers: (serverCountsData[code] || 0) > 0
            });
          }
        });
      });
    }
    setupInteraction(canvas2D);
    const resize = /* @__PURE__ */ __name(() => {
      const w = container.clientWidth || 500, h = container.clientHeight || 500;
      (canvasGL.width !== w || canvasGL.height !== h) && (canvasGL.width = w, canvasGL.height = h, canvas2D.width = w, canvas2D.height = h, gl.viewport(0, 0, w, h));
    }, "resize");
    new ResizeObserver(resize).observe(container), resize(), requestAnimationFrame(renderLoop);
  });
  function createBaseSphere(radius, subDivs) {
    const positions = [], uvs = [], indices = [];
    for (let latStep = 0; latStep <= subDivs; latStep++) {
      const latNormalized = latStep / subDivs, latDeg = latNormalized * 180 - 90;
      let v = latNormalized;
      latStep === 0 && (v = 1e-3), latStep === subDivs && (v = 0.999);
      for (let lonStep = 0; lonStep <= subDivs; lonStep++) {
        const lonNormalized = lonStep / subDivs, lonDeg = lonNormalized * 360 - 180, p = latLonToVector3(latDeg, lonDeg, radius);
        positions.push(p.x, p.y, p.z), uvs.push(lonNormalized, v);
      }
    }
    for (let lat = 0; lat < subDivs; lat++)
      for (let lon = 0; lon < subDivs; lon++) {
        const first = lat * (subDivs + 1) + lon, second = first + subDivs + 1;
        indices.push(first, second, first + 1), indices.push(second, second + 1, first + 1);
      }
    return {
      positions: new Float32Array(positions),
      uvs: new Float32Array(uvs),
      indices: new Uint16Array(indices)
    };
  }
  __name(createBaseSphere, "createBaseSphere");
  function renderLoop() {
    const { rotation, momentum, cameraZ, mouse, easterEggActive, isDragging, isHoveringGlobe } = input;
    isDragging || (rotation.x += momentum.x, rotation.y += momentum.y, momentum.x *= 0.92, momentum.y *= 0.92, Math.abs(momentum.x) < 1e-4 && Math.abs(momentum.y) < 1e-4 && !isHoveringGlobe && (rotation.y += CONFIG.AUTO_ROTATE_SPEED)), gl.clearColor(0, 0, 0, 0), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const aspect = gl.canvas.width / gl.canvas.height;
    Mat4.perspective(matrices.proj, 45 * CONSTANTS.DEG_TO_RAD, aspect, CONFIG.Z_NEAR, CONFIG.Z_FAR), Mat4.identity(matrices.view), Mat4.translateZ(matrices.view, cameraZ), Mat4.identity(matrices.model), Mat4.rotateX(matrices.model, rotation.x), Mat4.rotateY(matrices.model, rotation.y), gl.uniformMatrix4fv(locations.model, !1, matrices.model), gl.uniformMatrix4fv(locations.view, !1, matrices.view), gl.uniformMatrix4fv(locations.proj, !1, matrices.proj), sphereBuffer && (gl.activeTexture(gl.TEXTURE0), gl.bindTexture(gl.TEXTURE_2D, mapTexture), gl.uniform1i(locations.sampler, 0), gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.pos), gl.vertexAttribPointer(locations.pos, 3, gl.FLOAT, !1, 0, 0), gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer.uv), gl.vertexAttribPointer(locations.tex, 2, gl.FLOAT, !1, 0, 0), gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereBuffer.idx), gl.uniform4fv(locations.oceanCol, CONSTANTS.COL_OCEAN), gl.drawElements(gl.TRIANGLES, sphereBuffer.count, gl.UNSIGNED_SHORT, 0)), ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height), Mat4.multiply(matrices.mvp, matrices.view, matrices.model), Mat4.multiply(matrices.mvp, matrices.proj, matrices.mvp);
    const hw = ctx.canvas.width / 2, hh = ctx.canvas.height / 2, distToCenter = Math.abs(cameraZ), horizonLimit = CONFIG.RADIUS * CONFIG.RADIUS / distToCenter - 0.15, now = Date.now();
    let activeHover = null, minHoverDist = 1 / 0;
    const renderList = [];
    for (let i = 0; i < markers.length; i++) {
      const m = markers[i];
      if (matrices.model[2] * m.x + matrices.model[6] * m.y + matrices.model[10] * m.z <= horizonLimit) continue;
      const w = matrices.mvp[3] * m.x + matrices.mvp[7] * m.y + matrices.mvp[11] * m.z + matrices.mvp[15];
      if (w <= CONFIG.PRERENDER_W) continue;
      const invW = 1 / w, sx = (matrices.mvp[0] * m.x + matrices.mvp[4] * m.y + matrices.mvp[8] * m.z + matrices.mvp[12]) * invW, sy = (matrices.mvp[1] * m.x + matrices.mvp[5] * m.y + matrices.mvp[9] * m.z + matrices.mvp[13]) * invW;
      if (sx >= -1.2 && sx <= 1.2 && sy >= -1.2 && sy <= 1.2) {
        const px = (sx + 1) * hw, py = (1 - sy) * hh, scale = 1500 / w, sScale = Math.max(0.2, Math.min(scale * 3e-3, 2)), dx = mouse.x - px, dy = mouse.y - py, distSq = dx * dx + dy * dy, hitRadSq = Math.pow(4 * sScale + 8, 2);
        distSq < hitRadSq && distSq < minHoverDist && (minHoverDist = distSq, activeHover = m, activeHover.screenX = px, activeHover.screenY = py), renderList.push({ m, px, py, sScale, active: m.hasServers || easterEggActive });
      }
    }
    input.isExternallyClosed && (activeHover = null);
    for (let i = 0; i < renderList.length; i++) {
      const { m, px, py, sScale, active } = renderList[i], isHover = activeHover === m;
      if (active) {
        const pulse = now % 2e3 / 2e3;
        ctx.beginPath(), ctx.arc(px, py, 3 * sScale + pulse * 10 * sScale, 0, CONSTANTS.PI_2), ctx.fillStyle = `rgba(51, 95, 255, ${1 - pulse})`, ctx.fill();
      }
      if (easterEggActive && easterEggTexture) {
        const s = 15 * sScale;
        ctx.drawImage(easterEggTexture, px - s / 2, py - s / 2, s, s);
      } else
        ctx.beginPath(), ctx.arc(px, py, (isHover ? 6 : 4) * sScale, 0, CONSTANTS.PI_2), ctx.fillStyle = active ? "#335fff" : "#666", ctx.strokeStyle = "rgba(255,255,255,0.9)", ctx.lineWidth = 1.5 * sScale, ctx.fill(), ctx.stroke();
    }
    handleHover(activeHover), requestAnimationFrame(renderLoop);
  }
  __name(renderLoop, "renderLoop");
  function createCanvas(parent, zIndex) {
    const c = document.createElement("canvas");
    return c.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: ${zIndex};`, parent.appendChild(c), c;
  }
  __name(createCanvas, "createCanvas");
  function createProgram(gl2, vsSource, fsSource) {
    const createShader = /* @__PURE__ */ __name((type, src) => {
      const s = gl2.createShader(type);
      return gl2.shaderSource(s, src), gl2.compileShader(s), gl2.getShaderParameter(s, gl2.COMPILE_STATUS) ? s : (console.error(gl2.getShaderInfoLog(s)), gl2.deleteShader(s), null);
    }, "createShader"), p = gl2.createProgram();
    return gl2.attachShader(p, createShader(gl2.VERTEX_SHADER, vsSource)), gl2.attachShader(p, createShader(gl2.FRAGMENT_SHADER, fsSource)), gl2.linkProgram(p), p;
  }
  __name(createProgram, "createProgram");
  function createBuffer(gl2, data, type) {
    const b = gl2.createBuffer();
    return gl2.bindBuffer(type, b), gl2.bufferData(type, data, gl2.STATIC_DRAW), b;
  }
  __name(createBuffer, "createBuffer");
  function loadTexture(gl2, url) {
    const tex = gl2.createTexture();
    gl2.bindTexture(gl2.TEXTURE_2D, tex), gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, 1, 1, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, new Uint8Array([50, 50, 50, 255]));
    const img = new Image();
    return img.crossOrigin = "anonymous", img.onload = () => {
      gl2.bindTexture(gl2.TEXTURE_2D, tex), gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, !0), gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, gl2.RGBA, gl2.UNSIGNED_BYTE, img), gl2.generateMipmap(gl2.TEXTURE_2D);
      const ext = gl2.getExtension("EXT_texture_filter_anisotropic") || gl2.getExtension("MOZ_EXT_texture_filter_anisotropic");
      if (ext) {
        const max = gl2.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl2.texParameterf(gl2.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(max, 8));
      }
      gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR_MIPMAP_LINEAR), gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT), gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
    }, img.src = url, tex;
  }
  __name(loadTexture, "loadTexture");
  function handleHover(active) {
    if (!ctx) return;
    const el = ctx.canvas;
    if (input.isDragging ? el.style.cursor = "grabbing" : el.style.cursor = active ? "pointer" : "grab", active) {
      const rect = el.getBoundingClientRect();
      document.dispatchEvent(new CustomEvent("rovalraGlobeHover", {
        detail: {
          active: !0,
          regionCode: active.code,
          city: active.city,
          country: active.country,
          x: rect.left + active.screenX,
          y: rect.top + active.screenY - 8
        }
      })), input.hoveredRegion = active;
    } else input.hoveredRegion && (document.dispatchEvent(new CustomEvent("rovalraGlobeHover", { detail: { active: !1 } })), input.hoveredRegion = null);
  }
  __name(handleHover, "handleHover");
  function setupInteraction(el) {
    const getDistToSurface = /* @__PURE__ */ __name(() => Math.max(0.1, Math.abs(input.cameraZ) - CONFIG.RADIUS), "getDistToSurface");
    el.addEventListener("pointerenter", () => {
      input.isHoveringGlobe = !0;
    }), el.addEventListener("pointerleave", () => {
      input.isHoveringGlobe = !1, input.isDragging || handleHover(null);
    }), el.addEventListener("wheel", (e) => {
      e.preventDefault(), input.cameraZ -= e.deltaY * (15e-4 * getDistToSurface()), input.cameraZ = Math.max(Math.min(input.cameraZ, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);
    }, { passive: !1 }), el.addEventListener("pointerdown", (e) => {
      input.isDragging = !0, input.hasMovedDuringClick = !1, input.dragStart = { x: e.clientX, y: e.clientY }, input.lastMouse = { x: e.clientX, y: e.clientY }, input.momentum = { x: 0, y: 0 }, el.setPointerCapture(e.pointerId), el.style.cursor = "grabbing";
    }), el.addEventListener("pointerup", (e) => {
      if (input.isDragging = !1, el.releasePointerCapture(e.pointerId), el.style.cursor = "grab", !input.hasMovedDuringClick && input.hoveredRegion) {
        const { hasServers, code } = input.hoveredRegion;
        (hasServers || input.easterEggActive) && code !== "BR" && document.dispatchEvent(new CustomEvent("rovalraRegionSelected", { detail: { regionCode: code } }));
      }
    }), el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      if (input.mouse.x = e.clientX - rect.left, input.mouse.y = e.clientY - rect.top, input.isDragging) {
        const deltaX = e.clientX - input.lastMouse.x, deltaY = e.clientY - input.lastMouse.y;
        !input.hasMovedDuringClick && Math.hypot(e.clientX - input.dragStart.x, e.clientY - input.dragStart.y) > 4 && (input.hasMovedDuringClick = !0);
        const rotScale = getDistToSurface() * CONFIG.FOV_FACTOR / el.clientHeight / CONFIG.RADIUS;
        input.rotation.y += deltaX * rotScale, input.rotation.x = Math.max(-1.5, Math.min(1.5, input.rotation.x + deltaY * rotScale)), input.momentum = { x: deltaY * rotScale, y: deltaX * rotScale }, input.lastMouse = { x: e.clientX, y: e.clientY };
      }
    });
  }
  __name(setupInteraction, "setupInteraction"), document.addEventListener("rovalraGlobe_UpdateData", (e) => {
    e.detail?.serverCounts && (serverCountsData = e.detail.serverCounts, markers.forEach((m) => {
      m.hasServers = (serverCountsData[m.code] || 0) > 0;
    }));
  }), document.addEventListener("rovalraGlobeEasterEgg", (e) => {
    if (input.easterEggActive = !0, e.detail.iconUrl) {
      const img = new Image();
      img.onload = () => {
        easterEggTexture = img;
      }, img.src = e.detail.iconUrl;
    }
  }), document.addEventListener("rovalraGlobeEasterEggOff", () => {
    input.easterEggActive = !1, easterEggTexture = null;
  }), document.addEventListener("rovalraGlobePanelClosed", () => {
    input.isExternallyClosed = !0, input.hoveredRegion = null, document.dispatchEvent(new CustomEvent("rovalraGlobeHover", { detail: { active: !1 } }));
  });
})();
