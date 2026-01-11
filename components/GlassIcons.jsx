// components/GlassIcons.jsx
import Link from 'next/link';
import './GlassIcons.css';

const GlassIcons = ({ items, className }) => {
  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`icon-btn ${item.customClass || ''}`}
          aria-label={item.label}
        >
          {/* Layer Belakang (Warna Gradient) */}
          <span 
            className="icon-btn__back" 
            style={{ background: item.color }} 
          ></span>
          
          {/* Layer Depan (Kaca) */}
          <span className="icon-btn__front">
            {/* Kita tidak perlu span tambahan untuk icon, langsung saja */}
            <span className="icon-btn__icon">
              {item.icon}
            </span>
          </span>
          
          {/* Label Tooltip */}
          <span className="icon-btn__label">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default GlassIcons;