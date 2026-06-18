import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { Camera, X, RotateCw, ZoomIn, ZoomOut, RefreshCw, Upload, Sparkles } from 'lucide-react';

interface ARTryOnModalProps {
  product: Product;
  onClose: () => void;
}

export default function ARTryOnModal({ product, onClose }: ARTryOnModalProps) {
  const [streamActive, setStreamActive] = useState(false);
  const [modelImage, setModelImage] = useState('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'); // Beautiful Indian Bride default
  const [useWebcam, setUseWebcam] = useState(false);
  const [arScale, setArScale] = useState(1.0);
  const [arRotation, setArRotation] = useState(0);
  const [arPosition, setArPosition] = useState({ x: 0, y: 30 }); // offset in px
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop video stream on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamActive(true);
      setUseWebcam(true);
    } catch (err: any) {
      console.error("Camera error:", err);
      setCameraError('Please allow camera permissions or ensure no other app is using it. Defaulting to our gorgeous model template to preview seamlessly.');
      setUseWebcam(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
    setUseWebcam(false);
  };

  // Drag handlers for precise jewelry positioning on screen
  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - arPosition.x,
      y: e.clientY - arPosition.y
    });
    const target = e.currentTarget;
    if (target) target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!isDragging) return;
    setArPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    setIsDragging(false);
    const target = e.currentTarget;
    if (target) target.releasePointerCapture(e.pointerId);
  };

  return (
    <div id="ar-tryon-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1C1B19]/85 backdrop-blur-md" onClick={() => { stopWebcam(); onClose(); }} />
      <div id="ar-tryon-frame" className="relative bg-[#FAF8F5] border border-[#C9973A]/40 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#F5F2EB] flex items-center justify-between bg-[#1C1B19]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9973A] animate-pulse" />
            <h3 className="font-serif font-black text-sm text-white tracking-widest uppercase">
              Svarna AR Try-on Studio
            </h3>
          </div>
          <button
            id="close-ar-modal-btn"
            onClick={() => { stopWebcam(); onClose(); }}
            className="text-[#A29E9A] hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions and Camera / Avatar selection togglers */}
        <div className="bg-[#FAF8F5] p-3 text-center border-b border-[#F5F2EB] flex flex-col sm:flex-row items-center justify-between gap-3 px-6">
          <p className="text-[11px] text-[#A29E9A]" id="ar-instructions">
            ✨ <span className="text-[#2C2A29] font-medium">Interactive Placement:</span> Drag the necklace directly on screen. Use controls to scale & align perfectly.
          </p>
          <div className="flex gap-2">
            {useWebcam ? (
              <button
                id="ar-stop-webcam"
                onClick={stopWebcam}
                className="bg-[#2C2A29] text-white text-[10px] px-3 py-1.5 rounded-full font-semibold border hover:bg-white hover:text-black cursor-pointer transition select-none"
              >
                Use Model Face
              </button>
            ) : (
              <button
                id="ar-start-webcam"
                onClick={startWebcam}
                className="bg-[#C9973A] text-[#1C1B19] text-[10px] px-3 py-1.5 rounded-full font-bold shadow hover:bg-[#E2B755] transition flex items-center gap-1 cursor-pointer select-none"
              >
                <Camera className="w-3.5 h-3.5" /> Enable Live Webcam
              </button>
            )}
          </div>
        </div>

        {/* Main AR Sandbox Screen container */}
        <div className="relative aspect-video max-h-[380px] bg-black overflow-hidden flex items-center justify-center">
          
          {useWebcam ? (
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]" // mirror effect
            />
          ) : (
            <img
              src={modelImage}
              alt="Model Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
          )}

          {/* DRAGGABLE JEWELRY OVERLAY */}
          <div
            className="absolute z-10 select-none cursor-move transition-all"
            style={{
              transform: `translate(${arPosition.x}px, ${arPosition.y}px) scale(${arScale}) rotate(${arRotation}deg)`,
              touchAction: 'none'
            }}
          >
            <img
              id="ar-draggable-jewelry"
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={`object-contain max-w-[210px] pointer-events-auto filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
                isDragging ? 'opacity-85 scale-102 border-dashed border border-[#C9973A]/40 rounded-lg p-1' : ''
              }`}
            />
            {isDragging && (
              <p className="text-[9px] bg-[#C9973A] text-white py-0.5 px-1.5 rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2 shadow whitespace-nowrap">
                DRAGGING
              </p>
            )}
          </div>

          {/* Compass grid helper */}
          <div className="absolute inset-0 border border-white/5 pointer-events-none" />

          {/* Error fallback message block if camera block */}
          {cameraError && (
            <div className="absolute top-2 left-2 right-2 bg-yellow-900/90 text-yellow-100 p-2 rounded-lg text-[9px] text-center max-w-md mx-auto z-20">
              {cameraError}
            </div>
          )}
        </div>

        {/* Bottom scale parameters calibration dials */}
        <div className="px-6 py-4 bg-[#F5F2EB]/60 flex flex-wrap items-center justify-between gap-4 border-t border-[#F5F2EB]">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#2C2A29]">Jewelry Scale:</span>
            <div className="flex items-center gap-1">
              <button
                id="ar-scale-down"
                onClick={() => setArScale(Math.max(0.4, arScale - 0.1))}
                className="bg-white hover:bg-gray-100 p-1.5 rounded-full border border-[#C9973A]/20 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-bold w-12 text-center text-[#2C2A29]">
                {Math.round(arScale * 100)}%
              </span>
              <button
                id="ar-scale-up"
                onClick={() => setArScale(Math.min(2.5, arScale + 0.1))}
                className="bg-white hover:bg-gray-100 p-1.5 rounded-full border border-[#C9973A]/20 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#2C2A29]">Rotate Jewellery:</span>
            <button
              id="ar-rotate-btn"
              onClick={() => setArRotation((prev) => (prev + 15) % 360)}
              className="bg-white text-xs font-medium text-[#2C2A29] px-3 py-1.5 rounded-full border border-[#C9973A]/20 hover:bg-[#C9973A]/5 transition flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" /> Rotate 15°
            </button>
          </div>

          <div className="flex gap-2">
            <button
              id="ar-reset-btn"
              onClick={() => {
                setArScale(1.0);
                setArRotation(0);
                setArPosition({ x: 0, y: 30 });
              }}
              className="text-[#2C2A29] border border-gray-300 hover:bg-gray-100 text-[11px] px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              Reset Guide
            </button>
            {!useWebcam && (
              <div className="relative">
                <select
                  id="ar-model-selector"
                  onChange={(e) => setModelImage(e.target.value)}
                  className="bg-white border border-[#C9973A]/30 text-[#2C2A29] text-[11px] px-3 py-1.5 rounded-full focus:outline-none focus:ring-1 focus:ring-[#C9973A] cursor-pointer"
                >
                  <option value="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80">Traditional Silk Bride</option>
                  <option value="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80">Festive Saree Hands</option>
                  <option value="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80">Classic Portrait Model</option>
                </select>
              </div>
            )}
          </div>

        </div>

        {/* Modal footer information */}
        <div className="px-6 py-3 bg-[#1C1B19] text-[#A29E9A] text-[10px] text-center">
          📷 All images are processed locally within your container browser stage. No video stream content or biometrics are stored or uploaded elsewhere.
        </div>
      </div>
    </div>
  );
}
