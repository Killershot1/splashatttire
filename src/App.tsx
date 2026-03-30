/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import { ShoppingBag, Menu, Search, ArrowRight, ArrowLeft, Instagram, Twitter, Facebook, Plus, User, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Performance Optimized Image Component
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy", 
  width, 
  height, 
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  loading?: "lazy" | "eager"; 
  width?: string | number; 
  height?: string | number;
  priority?: boolean;
}) => {
  const handleLoad = () => {
    ScrollTrigger.refresh();
  };

  return (
    <picture>
      {/* Fallback for next-gen formats if we had them */}
      {/* <source srcSet={`${src}?format=avif`} type="image/avif" /> */}
      {/* <source srcSet={`${src}?format=webp`} type="image/webp" /> */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : loading}
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        referrerPolicy="no-referrer"
        style={{ objectFit: 'cover' }}
      />
    </picture>
  );
};

const PRODUCTS = [
  {
    id: 1,
    name: "Silk Draped Gown",
    price: "$890",
    category: "WOMEN",
    image: "https://iili.io/BHJTOXt.jpg"
  },
  {
    id: 2,
    name: "Tailored Urban Suit",
    price: "$550",
    category: "MEN",
    image: "https://iili.io/BHHRf8x.jpg"
  },
  {
    id: 3,
    name: "Modern Classic Blazer",
    price: "$320",
    category: "MEN",
    image: "https://iili.io/BHHR26u.jpg"
  },
  {
    id: 4,
    name: "Leather Chelsea Boots",
    price: "$420",
    category: "SHOES",
    image: "https://iili.io/BHdMiPf.jpg"
  },
  {
    id: 5,
    name: "Velvet Evening Clutch",
    price: "$280",
    category: "WOMEN",
    image: "https://iili.io/BHJTtEu.jpg"
  },
  {
    id: 6,
    name: "Contemporary Linen Set",
    price: "$680",
    category: "MEN",
    image: "https://iili.io/BHHRKaj.jpg"
  },
  {
    id: 7,
    name: "Satin Slip Dress",
    price: "$450",
    category: "WOMEN",
    image: "https://iili.io/BHJuzTN.jpg"
  },
  {
    id: 8,
    name: "Kids Cotton Set",
    price: "$120",
    category: "KIDS",
    image: "https://iili.io/BHdnRff.jpg"
  },
  {
    id: 9,
    name: "Classic Derby Shoes",
    price: "$380",
    category: "SHOES",
    image: "https://iili.io/BHdMZS2.jpg"
  },
  {
    id: 10,
    name: "Structured Overcoat",
    price: "$750",
    category: "MEN",
    image: "https://iili.io/BHHRF3b.jpg"
  },
  {
    id: 11,
    name: "Pleated Midi Skirt",
    price: "$290",
    category: "WOMEN",
    image: "https://iili.io/BHJuACX.jpg"
  },
  {
    id: 12,
    name: "Kids Denim Jacket",
    price: "$150",
    category: "KIDS",
    image: "https://iili.io/BHdngqJ.jpg"
  },
  {
    id: 13,
    name: "Artisanal Wool Jacket",
    price: "$590",
    category: "MEN",
    image: "https://iili.io/BHHRnwB.jpg"
  },
  {
    id: 14,
    name: "Signature Evening Suit",
    price: "$920",
    category: "MEN",
    image: "https://iili.io/BHHRoZP.jpg"
  },
  {
    id: 15,
    name: "Modernist Trench Coat",
    price: "$840",
    category: "MEN",
    image: "https://iili.io/BHHRzn1.jpg"
  },
  {
    id: 16,
    name: "Luxe Cashmere Blend",
    price: "$480",
    category: "MEN",
    image: "https://iili.io/BHHRIMF.jpg"
  },
  {
    id: 18,
    name: "Avant-Garde Ensemble",
    price: "$1100",
    category: "MEN",
    image: "https://iili.io/BHH5HRR.jpg"
  },
  {
    id: 19,
    name: "Heritage Pattern Suit",
    price: "$980",
    category: "MEN",
    image: "https://iili.io/BHH53xI.jpg"
  },
  {
    id: 20,
    name: "Bespoke Evening Wear",
    price: "$1250",
    category: "MEN",
    image: "https://iili.io/BHHRGPn.jpg"
  },
  {
    id: 21,
    name: "Royal Velvet Tuxedo",
    price: "$1400",
    category: "MEN",
    image: "https://iili.io/BHH5dDN.jpg"
  },
  {
    id: 22,
    name: "Kids Designer Ensemble",
    price: "$180",
    category: "KIDS",
    image: "https://iili.io/BHdn4gR.jpg"
  },
  {
    id: 23,
    name: "Kids Luxury Outerwear",
    price: "$220",
    category: "KIDS",
    image: "https://iili.io/BHdnr0v.jpg"
  },
  {
    id: 24,
    name: "Oxford Dress Shoes",
    price: "$450",
    category: "SHOES",
    image: "https://iili.io/BHdMQcl.jpg"
  },
  {
    id: 25,
    name: "Suede Loafers",
    price: "$390",
    category: "SHOES",
    image: "https://iili.io/BHdMPMG.jpg"
  },
  {
    id: 26,
    name: "Classic Monk Straps",
    price: "$480",
    category: "SHOES",
    image: "https://iili.io/BHJTOXt.jpg"
  },
  {
    id: 27,
    name: "Designer Sneakers",
    price: "$520",
    category: "SHOES",
    image: "https://iili.io/BHdWf1f.jpg"
  },
  {
    id: 28,
    name: "Italian Leather Boots",
    price: "$650",
    category: "SHOES",
    image: "https://iili.io/BHdVPb1.jpg"
  },
  {
    id: 29,
    name: "Luxury Velvet Slippers",
    price: "$340",
    category: "SHOES",
    image: "https://iili.io/BHJudhP.jpg"
  }
];

const CATEGORIES = [
  { id: 1, title: "MEN", image: "https://i.postimg.cc/0ytgjrZf/stylish-african-american-man-urban-600nw-2645618061.webp", description: "Refined essentials for the modern gentleman." },
  { id: 2, title: "WOMEN", image: "https://iili.io/BHJudhP.jpg", description: "Ethereal silhouettes and timeless elegance." },
  { id: 3, title: "KIDS", image: "https://iili.io/BHdnRff.jpg", description: "Playful designs for the next generation." },
  { id: 4, title: "SHOES", image: "https://iili.io/BHdMiPf.jpg", description: "Step into luxury with our curated footwear." },
];

export default function App() {
  const [view, setView] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Trigger loading state when view changes
  useEffect(() => {
    if (view !== 'home') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Initialize Smooth Scroll
  useEffect(() => {
    if (view !== 'home') return; // Only smooth scroll on home for now to avoid conflicts

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [view]);

  useGSAP(() => {
    if (view !== 'home') return;

    // Custom Cursor Logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
      });
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Split Text Animations
    const splitElements = document.querySelectorAll('.split-text');
    const splitInstances: SplitType[] = [];
    
    splitElements.forEach(el => {
      const split = new SplitType(el as HTMLElement, { types: 'chars,words' });
      splitInstances.push(split);
      
      if (split.chars) {
        gsap.from(split.chars, {
          y: 50,
          opacity: 0,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Hero Reveal
    const heroSplit = new SplitType('.hero-title-text', { types: 'chars' });
    splitInstances.push(heroSplit);

    const tl = gsap.timeline();
    
    // Initial states for a smoother reveal without the "black bar" effect
    gsap.set(".hero-image", { scale: 1.1 });

    tl.to(".hero-image", {
      scale: 1,
      duration: 2.5,
      ease: "power2.out"
    });

    if (heroSplit.chars) {
      tl.from(heroSplit.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out"
      }, "-=1.5");
    }
    
    tl.from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=1");

    // Horizontal Scroll - Restored GSAP pinning
    if (horizontalRef.current && horizontalSectionRef.current) {
      const items = gsap.utils.toArray(".horizontal-item");
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => "+=" + horizontalRef.current?.offsetWidth
        }
      });
    }

    // Image Reveal on Scroll
    gsap.utils.toArray(".reveal-img-container").forEach((container: any) => {
      const img = container.querySelector(".reveal-img");
      gsap.fromTo(container, 
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          }
        }
      );
      gsap.fromTo(img, 
        { scale: 1.4 },
        { 
          scale: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          }
        }
      );
    });

    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.magnetic');
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power3.out"
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    // Cursor Hover Effects
    const hoverables = document.querySelectorAll('a, button, .group');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 4, backgroundColor: 'white', mixBlendMode: 'difference' });
        gsap.to(cursorDotRef.current, { opacity: 0 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'white', mixBlendMode: 'difference' });
        gsap.to(cursorDotRef.current, { opacity: 1 });
      });
    });

    // Section Reveal Animations
    const sections = gsap.utils.toArray('section:not(.hero-section)');
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Parallax Effect for Images
    gsap.utils.toArray('.reveal-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      splitInstances.forEach(instance => instance.revert());
    };
  }, { scope: containerRef, dependencies: [view] });

  const ProductSkeleton = () => (
    <div className="mb-12 md:mb-0">
      <div className="aspect-[3/4] mb-8 bg-gray-200 rounded-[2rem] border border-black/5 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="h-14 bg-gray-200 rounded-[50px] w-full relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );

  const CategoryView = ({ title, description, image }: { title: string, description: string, image: string }) => {
    const filteredProducts = view === 'all-products' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category.toLowerCase() === view);

    return (
      <div ref={containerRef} className="min-h-screen bg-[#fdfcf8] text-black pt-24 md:pt-40 px-6 md:px-12 relative overflow-hidden gold-swirl-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => {
              setView('home');
              window.scrollTo(0, 0);
            }}
            className="group flex items-center gap-4 mb-12 md:mb-20 text-black hover:text-black/60 transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="micro-label font-bold text-black">Back to Home</span>
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-20 md:mb-32">
            <div className="order-2 lg:order-1">
              <p className="micro-label mb-4 md:mb-6 text-[#d4af37] font-bold">Collection</p>
              <h2 className="editorial-title text-6xl md:text-8xl lg:text-[10vw] mb-6 md:mb-8 leading-tight">{title}</h2>
              <p className="text-lg md:text-xl text-black/60 max-w-md leading-relaxed">
                {description}
              </p>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-black/5">
              <OptimizedImage 
                src={image} 
                alt={title} 
                className="w-full h-full category-hero-img" 
                width="1200"
                height="1600"
                priority={true}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 md:gap-6 mb-12 md:mb-20 border-b border-black/5 pb-10">
            {['MEN', 'WOMEN', 'KIDS', 'SHOES'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setView(cat.toLowerCase());
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-10 py-4 rounded-2xl micro-label font-bold transition-all duration-500 ${
                  view === cat.toLowerCase() 
                    ? 'bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-105' 
                    : 'bg-white text-black border border-black/5 hover:border-black/20 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => {
                setView('all-products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-10 py-4 rounded-2xl micro-label font-bold transition-all duration-500 ${
                view === 'all-products' 
                  ? 'bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-105' 
                  : 'bg-white text-black border border-black/5 hover:border-black/20 hover:bg-gray-50'
              }`}
            >
              ALL
            </button>
          </div>

          <div className="border-t border-black/5 pt-16 md:pt-20">
            <h3 className="text-2xl md:text-3xl font-serif italic mb-10 md:mb-12">
              {view === 'all-products' ? 'All Products' : `${title} Collection`}
            </h3>
            
            {/* Responsive Product Grid / Scroll Area */}
            <div className="md:grid md:grid-cols-3 md:gap-12 pb-20 max-md:h-[70vh] max-md:overflow-y-auto max-md:pr-4 custom-scrollbar">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer mb-12 md:mb-0">
                    <div className="reveal-img-container aspect-[3/4] overflow-hidden mb-8 bg-gray-100 rounded-[2rem] border border-black/5 shadow-sm">
                      <OptimizedImage 
                        src={product.image} 
                        alt={product.name} 
                        className="reveal-img w-full h-full transition-transform duration-700 group-hover:scale-110" 
                        width="800"
                        height="1067"
                      />
                    </div>
                    
                    <motion.a 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/263772663855?text=I'm interested in this product: ${product.name} ${product.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/wa flex items-center justify-center w-full h-[56px] rounded-[50px] overflow-hidden transition-all duration-500 bg-black border border-[#d4af37] relative gap-2 group-hover/wa:bg-[#d4af37]/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 w-[200%] -translate-x-full group-hover/wa:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent pointer-events-none" />
                      
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                      >
                        <svg className="w-5 h-5 fill-[#d4af37] drop-shadow-md" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.605 6.044L0 24l6.102-1.602a11.777 11.777 0 005.946 1.601h.005c6.634 0 12.044-5.413 12.048-12.05a11.751 11.751 0 00-3.489-8.492z"/></svg>
                      </motion.div>
                      
                      <span className="text-[#d4af37] font-sans font-bold text-[13px] tracking-tighter relative z-10">
                        ENQUIRE
                      </span>
                    </motion.a>
                  </div>
                ))
              )}
              {!isLoading && filteredProducts.length === 0 && (
                <div className="col-span-3 py-20 text-center">
                  <p className="text-black/40 italic font-serif text-xl text-center w-full">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (view !== 'home') {
    let category;
    if (view === 'all-products') {
      category = { 
        title: 'All Products', 
        description: 'Explore our complete collection of Splash Attire.', 
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200' 
      };
    } else {
      category = CATEGORIES.find(c => c.title.toLowerCase() === view) || { 
        title: 'Collection', 
        description: 'Explore our curated selection of luxury fashion.', 
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200' 
      };
    }
    return <CategoryView {...category} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen font-sans bg-black text-[#1a1a1a] selection:bg-black selection:text-white">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorDotRef} className="custom-cursor-dot hidden md:block" />

      {/* Header Overlay */}
      <header className="absolute top-0 left-0 w-full z-[100] bg-transparent p-6 md:p-12 flex justify-between items-start pointer-events-none">
        {/* Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pointer-events-auto magnetic text-white hover:text-[#d4af37] transition-colors"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Logo */}
        <button 
          onClick={() => setView('home')}
          className="pointer-events-auto flex flex-col items-end gap-2 group"
        >
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl overflow-hidden transition-transform group-hover:scale-105">
            <OptimizedImage 
              src="https://i.postimg.cc/QxCZqjBJ/Screenshot-2026-03-27-130301.png" 
              alt="Splash Attire" 
              className="w-10 h-10 object-contain"
              width="40"
              height="40"
            />
          </div>
          <span className="text-[10px] font-serif italic text-white tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Splash Attire</span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black z-[90] transition-transform duration-700 pointer-events-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col justify-center px-12 gap-8">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => { setView(cat.title.toLowerCase()); setIsMenuOpen(false); }}
                className="text-5xl font-serif italic text-white text-left hover:text-[#d4af37] transition-colors"
              >
                {cat.title}
              </button>
            ))}
            <button 
              onClick={() => { setView('all-products'); setIsMenuOpen(false); }}
              className="text-5xl font-serif italic text-white text-left hover:text-[#d4af37] transition-colors"
            >
              Shop All
            </button>

            <button 
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center gap-4 mt-12 text-[#d4af37] hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover:border-white transition-all">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <span className="text-2xl font-serif italic">Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="hero-image-container absolute inset-0 z-0 w-full h-full">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="hero-image w-full h-full"
            width="2000"
            height="1125"
            priority={true}
          />
          {/* Subtle Scrim */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <p className="micro-label mb-6 md:mb-8 tracking-[0.4em] text-white/90 text-[10px] md:text-xs uppercase">High Fashion • Sustainable • Timeless</p>
          <h2 className="hero-title editorial-title text-[18vw] md:text-[12vw] leading-[0.8] flex flex-col items-center justify-center">
            <span className="hero-title-text text-white">Splash</span>
            <span className="hero-title-text italic -mt-[2vw] md:-mt-[1vw] text-white">Attire</span>
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
          <p className="micro-label text-white text-[9px] tracking-[0.3em]">Scroll to Explore</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#fdfcf8] text-black gold-swirl-bg">
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="micro-label text-[#d4af37] mb-8 md:mb-12 font-bold">Location</p>
          <h3 className="split-text text-4xl md:text-7xl font-serif leading-tight text-center mb-20">
            16 Elsworth Ave, <span className="italic">Harare</span>, Zimbabwe.
          </h3>
          
          <div className="max-w-3xl mx-auto text-center py-16 border-y border-black/5 my-20 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#fdfcf8] px-4">
              <span className="text-6xl text-[#d4af37] opacity-20 font-serif">“</span>
            </div>
            <p className="text-2xl md:text-3xl font-serif italic text-black/80 leading-relaxed px-6">
              Every stitch is a testament to our commitment to artisanal excellence and environmental stewardship.
            </p>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#fdfcf8] px-4">
              <span className="text-6xl text-[#d4af37] opacity-20 font-serif">”</span>
            </div>
          </div>


        </div>
      </section>

      {/* Horizontal Rollable Section */}
      <section ref={horizontalSectionRef} className="horizontal-scroll-section h-screen bg-[#0a0a0a] overflow-hidden relative gold-swirl-bg">
        {/* Subtle Gold Swirl in Dark Section */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66-3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-45c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm58 41c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM32 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm54 23c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM9 51c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm58 40c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z' fill='%23d4af37' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }} 
        />
        
        <div className="absolute top-6 md:top-10 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-start">
            <div>
              <p className="micro-label text-[#d4af37] mb-1">Collections</p>
              <h3 className="text-xl md:text-3xl font-serif italic text-white leading-tight">Browse Categories</h3>
            </div>
            <div className="hidden md:flex gap-4 mt-2">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div ref={horizontalRef} className="horizontal-container h-full flex flex-nowrap relative z-10">
          {CATEGORIES.map((item) => (
            <div 
              key={item.id} 
              className="horizontal-item flex-shrink-0 w-screen h-full flex items-center justify-center px-6 md:px-20 pt-24 md:pt-20"
            >
              <div 
                className="horizontal-card w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center group cursor-pointer"
                onClick={() => setView(item.title.toLowerCase())}
              >
                <div className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] aspect-[3/4] mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    width="1200"
                    height="1600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-10 left-10 right-10 lg:hidden">
                    <p className="micro-label text-white/60 mb-2">0{item.id}</p>
                    <h4 className="text-3xl font-serif italic text-white mb-4">{item.title}</h4>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <p className="micro-label text-[#d4af37] mb-6">0{item.id} / 04</p>
                  <h4 className="editorial-title text-white mb-8 !text-[6vw] leading-none">{item.title}</h4>
                  <p className="text-white/40 text-xl leading-relaxed mb-12 max-w-md">
                    {item.description}
                  </p>
                  <button className="flex items-center gap-4 text-white hover:text-[#d4af37] transition-all group/btn">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-[#d4af37] group-hover/btn:border-[#d4af37] transition-all">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <span className="micro-label font-bold">Explore Collection</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid - Now "The Full Collection" */}
      <section className="py-40 px-6 md:px-12 bg-[#fdfcf8] text-black border-t border-black/5 gold-swirl-bg will-change-transform [transform:translateZ(0)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-32">
            <div className="flex flex-col gap-4">
              <p className="micro-label text-[#d4af37] font-bold">New Releases</p>
              <h3 className="text-5xl md:text-7xl font-serif italic">The Full Collection</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {PRODUCTS.slice(0, 4).map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="reveal-img-container aspect-[3/4] mb-8 rounded-[2rem] overflow-hidden border border-black/5 shadow-sm">
                  <OptimizedImage 
                    src={product.image} 
                    alt={product.name}
                    className="reveal-img w-full h-full"
                    width="800"
                    height="1067"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-6">
                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/263772663855?text=I'm interested in this product: ${product.name} ${product.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/wa flex items-center justify-center w-full h-[56px] rounded-[50px] overflow-hidden transition-all duration-500 bg-black border border-[#d4af37] relative gap-2 group-hover/wa:bg-[#d4af37]/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 w-[200%] -translate-x-full group-hover/wa:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent pointer-events-none" />
                    
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <svg className="w-5 h-5 fill-[#d4af37] drop-shadow-md" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412 0 12.048c0 2.123.554 4.197 1.605 6.044L0 24l6.102-1.602a11.777 11.777 0 005.946 1.601h.005c6.634 0 12.044-5.413 12.048-12.05a11.751 11.751 0 00-3.489-8.492z"/></svg>
                    </motion.div>
                    
                    <span className="text-[#d4af37] font-sans font-bold text-[13px] tracking-tighter relative z-10">
                      ENQUIRE
                    </span>
                  </motion.a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 flex justify-center">
            <button 
              onClick={() => setView('all-products')}
              className="magnetic group flex items-center gap-6 border border-black/10 px-16 py-6 rounded-full hover:bg-black hover:text-white transition-all duration-700 shadow-sm"
            >
              <span className="micro-label text-inherit font-bold">Browse All</span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 md:px-12 bg-white text-black border-t border-black/5 relative overflow-hidden gold-swirl-bg">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="micro-label text-[#d4af37] mb-12 font-bold">Our Philosophy</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="flex flex-col items-center">
              <span className="text-4xl text-[#d4af37] mb-6 font-serif opacity-40">“</span>
              <p className="text-xl font-serif italic text-black/70 leading-relaxed">
                Fashion is not something that exists in dresses only. Fashion is in the sky, in the street.
              </p>
              <p className="micro-label mt-8">— Coco Chanel</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-[#d4af37] mb-6 font-serif opacity-40">“</span>
              <p className="text-xl font-serif italic text-black/70 leading-relaxed">
                Simplicity is the ultimate sophistication.
              </p>
              <p className="micro-label mt-8">— Leonardo da Vinci</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-[#d4af37] mb-6 font-serif opacity-40">“</span>
              <p className="text-xl font-serif italic text-black/70 leading-relaxed">
                Buy less, choose well, make it last.
              </p>
              <p className="micro-label mt-8">— Vivienne Westwood</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] pt-40 pb-12 px-6 md:px-12 text-[#F0F0F0] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 mb-32">
            <div className="flex flex-col gap-12">
              <div className="magnetic w-20 h-20 md:w-24 md:h-24 bg-[#FDFDFD] rounded-[1.8rem] md:rounded-[2.2rem] flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.5)] border border-white/10 overflow-hidden group hover:border-[#d4af37]/30 transition-all duration-1000 ease-out hover:shadow-[0_25px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.1)] relative">
                <OptimizedImage 
                  src="https://i.postimg.cc/QxCZqjBJ/Screenshot-2026-03-27-130301.png" 
                  alt="Splash Attire" 
                  className="w-14 h-14 md:w-18 md:h-18 object-contain transition-all duration-1000 group-hover:scale-105 relative z-10"
                  width="80"
                  height="80"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none" />
              </div>
              <div>
                <h2 className="editorial-title leading-none text-white/[0.03] mb-4 !text-[6vw] pointer-events-none select-none">Splash Attire</h2>
                <p className="text-xl font-serif italic text-[#CCCCCC] max-w-md">
                  Zimbabwe's premier destination for sustainable high fashion and artisanal excellence.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="micro-label text-[#D4AF37] mb-4 font-bold">Newsletter</p>
              <h3 className="text-3xl font-serif italic mb-10 text-[#D4AF37]">Join the inner circle.</h3>
              <div className="flex gap-6 border-b border-[#D4AF37]/30 pb-4 mb-12 group focus-within:border-[#D4AF37] transition-colors">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent text-xl focus:outline-none flex-grow placeholder:text-white/10 text-white"
                />
                <button className="magnetic micro-label font-bold text-[#D4AF37] hover:text-white transition-all relative group/sub">
                  Subscribe
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover/sub:w-full transition-all duration-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="micro-label text-[#D4AF37] mb-4 font-bold opacity-80">Location</p>
                  <p className="text-lg text-[#F0F0F0] font-medium">16 Elsworth Ave<br />Harare, Zimbabwe</p>
                </div>
                <div>
                  <p className="micro-label text-[#D4AF37] mb-4 font-bold opacity-80">Contact</p>
                  <p className="text-lg text-[#F0F0F0] font-medium">maveraannie01@gmail.com<br />+263 77 266 3855</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-[#d4af37]/20 gap-8">
            <div className="flex gap-10">
              <Instagram className="w-5 h-5 text-[#D4AF37] hover:text-white transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 text-[#D4AF37] hover:text-white transition-colors cursor-pointer" />
              <Facebook className="w-5 h-5 text-[#D4AF37] hover:text-white transition-colors cursor-pointer" />
            </div>
            <p className="text-[10px] text-[#CCCCCC] uppercase tracking-[0.3em] font-bold">© 2026 Splash Attire • Harare</p>
            <div className="flex gap-10">
              <span className="micro-label text-[#CCCCCC] hover:text-[#D4AF37] cursor-pointer transition-colors font-bold">Privacy</span>
              <span className="micro-label text-[#CCCCCC] hover:text-[#D4AF37] cursor-pointer transition-colors font-bold">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
