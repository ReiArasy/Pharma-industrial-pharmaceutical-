import { Product } from '../types';

export const products: Product[] = [
  {
    slug: "tablet-press-tp-500",
    name: "Tablet Press TP-500",
    category: "Tablet Compression",
    capacity: "500,000 tablets/hour",
    compliance: ["cGMP", "GMP", "ISO 9001", "FDA Compliant"],
    cover: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Maximum Capacity", value: "500,000 tablets/hour" },
      { label: "Punch Station Count", value: "45 Stations (D-Tooling)" },
      { label: "Max Compression Force", value: "100 kN" },
      { label: "Max Tablet Diameter", value: "25 mm" },
      { label: "Main Power Supply", value: "15 kW, 380V, 50Hz" },
      { label: "Product Contact Material", value: "Stainless Steel 316L (Sterile Grade)" },
      { label: "Control Architecture", value: "Siemens S7-1500 PLC & 12\" Touch HMI" },
      { label: "Physical Footprint", value: "1,200 x 1,150 x 1,980 mm" },
      { label: "Net Weight", value: "3,200 kg" }
    ],
    description: "High-precision rotary tablet press designed specifically for high-capacity industrial lines. Engineered for full compliance with international cGMP and FDA standards. Employs advanced servo-drive technology for precise dosing depth adjustments, keeping tablet weight deviation under 1%. Features an integrated dual-precompression station and a smart automated dedusting unit.",
    specSheetUrl: "#/docs/tp-500-datasheet.pdf",
    featured: true
  },
  {
    slug: "fluid-bed-dryer-fbd-200",
    name: "Fluid Bed Dryer FBD-200",
    category: "Mixing & Granulation",
    capacity: "200 kg/batch",
    compliance: ["cGMP", "GMP", "ATEX Ex-Proof"],
    cover: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522083165195-342750297f05?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Operating Capacity", value: "80 - 200 kg per batch" },
      { label: "Bowl Total Volume", value: "420 Liters" },
      { label: "Drying Temperature Range", value: "30°C - 120°C (Accuracy ±1°C)" },
      { label: "Air Filtration Efficiency", value: "HEPA H13 Certified (99.97%)" },
      { label: "Steam Intake Demand", value: "120 kg/hour at 3 bar" },
      { label: "Product Contact Material", value: "Stainless Steel 316L (Electro-polished Ra < 0.4 µm)" },
      { label: "Safety Rating", value: "ATEX 2GD Explosion Proof Design" }
    ],
    description: "A premier drying system utilizing micro-conditioned hot air fluidization for fast, uniform drying of sensitive active pharmaceutical ingredients (APIs). Smooth thermal distribution prevents localized degradation of heat-sensitive compounds. Features multi-chamber automatic reverse pulse jet filter bags for clean operation.",
    specSheetUrl: "#/docs/fbd-200-datasheet.pdf",
    featured: true
  },
  {
    slug: "high-shear-mixer-hsm-150",
    name: "High Shear Mixer HSM-150",
    category: "Mixing & Granulation",
    capacity: "150 Liters/batch",
    compliance: ["cGMP", "GMP", "ISO 14001"],
    cover: "https://images.unsplash.com/photo-1522083165195-342750297f05?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522083165195-342750297f05?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Bowl Total Capacity", value: "150 Liters" },
      { label: "Working Fluid Volume", value: "45 - 120 Liters per batch" },
      { label: "Main Impeller Velocity", value: "50 - 350 RPM (Inverter Driven)" },
      { label: "Side Chopper Speed", value: "1,500 - 3,000 RPM" },
      { label: "Impeller Motor Power", value: "11 kW" },
      { label: "Chopper Motor Power", value: "4 kW" },
      { label: "Surface Finish", value: "Stainless Steel 316L, Mirror finish" }
    ],
    description: "High-speed wet granulation mixer featuring an optimized bottom-entry Z-impeller and a side-mounted high-speed chopper. This configuration promotes homogenous binder distribution and narrow-distribution granule formation with perfect density control in ultra-short process cycles (8-12 minutes).",
    specSheetUrl: "#/docs/hsm-150-datasheet.pdf",
    featured: false
  },
  {
    slug: "coater-autocoat-ac-120",
    name: "AutoCoat AC-120",
    category: "Tablet Coating",
    capacity: "120 kg/batch",
    compliance: ["cGMP", "GMP", "FDA Certified"],
    cover: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Pan Load Capacity", value: "40 - 120 kg per batch" },
      { label: "Main Coating Drum Diameter", value: "1,200 mm" },
      { label: "Drum Rotation Rate", value: "2 - 18 RPM" },
      { label: "Spray Gun Assembly", value: "3x Schlick (Germany) Sterile Nozzles" },
      { label: "Inlet Air Temperature", value: "40°C - 90°C" },
      { label: "Air Exhaust Volume", value: "2,500 m³/hour" },
      { label: "Liquid Delivery Pump", value: "Watson Marlow Peristaltic System" }
    ],
    description: "Fully automated tablet coating system characterized by high thermal exchange efficiency. Equipped with a micro-perforated drum design and state-of-the-art German Schlick spray nozzles. Supports water-based, organic solvent-based, or sugar coating with uniform liquid dispersion and minimal waste.",
    specSheetUrl: "#/docs/ac-120-datasheet.pdf",
    featured: true
  },
  {
    slug: "blister-packing-bp-400",
    name: "Blister Packing BP-400",
    category: "Filling & Packaging",
    capacity: "400 blisters/min",
    compliance: ["cGMP", "GMP", "CE Certified"],
    cover: "https://images.unsplash.com/photo-1587854692152-cbe660db0969?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660db0969?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Production Output Rate", value: "Up to 400 blisters/minute" },
      { label: "Maximum Foil Width", value: "260 mm" },
      { label: "Forming Cycle Stroke", value: "40 - 150 mm" },
      { label: "Supported Materials", value: "PVC, PVDC, Aluminium (Alu-Alu & Alu-PVC)" },
      { label: "Maximum Forming Depth", value: "12 mm" },
      { label: "Rejection Protocol", value: "Keyence Integrated High-Speed Vision System" },
      { label: "Compressed Air Flow", value: "350 L/minute at 6 bar" }
    ],
    description: "High-speed automated blister packaging machine utilizing rotary forming and flat sealing, optimized for pharmaceutical-grade Alu-Alu and Alu-PVC packs. Equipped with an ultra-fast digital inspection camera that detects and flags empty pockets, broken tablets, or color variances for automatic ejection.",
    specSheetUrl: "#/docs/bp-400-datasheet.pdf",
    featured: false
  },
  {
    slug: "liquid-filling-lf-100",
    name: "Sterile Liquid Filling LF-100",
    category: "Filling & Packaging",
    capacity: "6,000 bottles/hour",
    compliance: ["cGMP", "GMP", "ISO 14644-1"],
    cover: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Dosing Volume", value: "2 ml - 100 ml (Precision ±0.5%)" },
      { label: "Operating Capacity", value: "4,000 - 6,000 bottles/hour" },
      { label: "Filling Nozzle Count", value: "8 Nozzles (Valveless Ceramic Pistons)" },
      { label: "Shielding Environment", value: "Integrated Nitrogen Gas Purging" },
      { label: "Capping Mechanism", value: "Servo Torque Control (Rubber & Aluminium Caps)" },
      { label: "Tubing Classification", value: "Platinum-Cured Food-Grade Silicon" }
    ],
    description: "Sterile filling line designed for vials, ampoules, and ophthalmic drops. Fully compatible with Restricted Access Barrier Systems (RABS) and isolation hoods. Uses valveless high-precision rotary ceramic piston pumps, suitable for rapid Clean-in-Place (CIP) and Sterilize-in-Place (SIP) protocols.",
    specSheetUrl: "#/docs/lf-100-datasheet.pdf",
    featured: true
  },
  {
    slug: "capsule-filler-cf-800",
    name: "Capsule Filler CF-800",
    category: "Capsule Filling",
    capacity: "80,000 capsules/hour",
    compliance: ["cGMP", "GMP"],
    cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Maximum Speed", value: "80,000 capsules/hour" },
      { label: "Supported Capsule Sizes", value: "Capsule No. 00, 0, 1, 2, 3, 4, 5" },
      { label: "Filling Dosing Accuracy", value: "≥ 99.2% (Tamping Pin Method)" },
      { label: "Compression Stations", value: "5-Stage Progressive Powder Tamping" },
      { label: "Electrical Input Requirements", value: "8 kW, 3-Phase" },
      { label: "Cleaning System", value: "Integrated Heavy-Duty Vacuum Deduster" }
    ],
    description: "Fully automated tamping pin capsule filling machine. Engineered to process powder, granules, pellets, or tablet-pellet combinations inside a single capsule. The intelligent mechanical reject system flags empty or incorrectly joined capsules, guaranteeing high yield with virtually zero waste.",
    specSheetUrl: "#/docs/cf-800-datasheet.pdf",
    featured: false
  },
  {
    slug: "autoclave-sterilizer-as-1000",
    name: "Sterilizer Autoclave AS-1000",
    category: "Sterilization",
    capacity: "1,000 Liters",
    compliance: ["cGMP", "GMP", "EN 285 Approved"],
    cover: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Chamber Volume", value: "1,080 Liters" },
      { label: "Operating Temperature", value: "105°C - 138°C" },
      { label: "Max Working Pressure", value: "Up to 3.2 Bar" },
      { label: "Door Configuration", value: "Double Sliding Door (Pneumatic Inflatable Seal)" },
      { label: "Sterilization Phases", value: "Fractionated Pre-vacuum, Exposure, Drying, Cool-down" },
      { label: "Pressure Vessel Steel", value: "Stainless Steel 316Ti (8mm solid plate)" }
    ],
    description: "Double-door pass-through steam sterilizer designed for sterile processing of glass vials, stainless steel components, cleanroom garments, and liquid media. Employs an ultra-reliable water ring vacuum pump for efficient pre-vacuum air removal, guaranteeing uniform steam penetration.",
    specSheetUrl: "#/docs/as-1000-datasheet.pdf",
    featured: false
  },
  {
    slug: "cleanroom-air-shower-as-2",
    name: "Cleanroom Air Shower AS-2",
    category: "Cleanroom Equipment",
    capacity: "2 Persons/cycle",
    compliance: ["cGMP", "GMP", "ISO Class 5 / Class 100"],
    cover: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Air Velocity at Nozzle", value: "22 - 25 m/second" },
      { label: "Nozzle Deployment", value: "16 Adjustable Stainless Steel Nozzles" },
      { label: "Filtration Classification", value: "Pre-filter G4 & HEPA H14 (99.995% @ 0.3 µm)" },
      { label: "Cycle Duration Range", value: "0 - 99 seconds (Adjustable, default 10s)" },
      { label: "Door Interlocking", value: "Double Electromagnetic Interlock System" },
      { label: "Enclosure Lighting", value: "LED Panel Flush Cleanroom Grade (400 Lux)" }
    ],
    description: "High-speed, micro-filtered air shower chamber to be installed at the entry interface of high-grade cleanrooms (Class A/B/C). High-velocity clean air jets actively dislodge dust, garment fibers, and external particulates from operators' protective garments before room entry.",
    specSheetUrl: "#/docs/as-2-datasheet.pdf",
    featured: false
  },
  {
    slug: "vial-labeler-vl-200",
    name: "High-Speed Vial Labeler VL-200",
    category: "Labeling",
    capacity: "12,000 vials/hour",
    compliance: ["cGMP", "GMP", "FDA Compliant"],
    cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Labeling Speed", value: "Up to 12,000 vials/hour" },
      { label: "Vial Diameter Range", value: "15 mm - 50 mm" },
      { label: "Label Width Range", value: "10 mm - 100 mm" },
      { label: "Labeling Accuracy", value: "±0.5 mm" },
      { label: "Rejection Rate", value: "0.01% with advanced vision sensors" },
      { label: "Control System", value: "Omron Sysmac Platform & HMI" }
    ],
    description: "Ultra-precise rotary labeling system designed specifically for sterile pharmaceutical vials and ampoules. Integrates a smart non-contact inspection system that verifies label presence, orientation, expiration date print, and barcode legibility, automatically ejecting defective containers.",
    specSheetUrl: "#/docs/vl-200-datasheet.pdf",
    featured: false
  }
];
