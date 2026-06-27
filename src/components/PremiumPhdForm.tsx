"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaChevronDown, FaCheckCircle, FaSearch, FaGlobe } from 'react-icons/fa';

const CustomSelect = ({
  label = "",
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: {
  label?: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:border-gray-200 ${isOpen ? 'ring-4 ring-[#019e6e]/5 border-[#019e6e]' : ''}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && <Icon className="text-[#019e6e] text-sm shrink-0" />}
          <span className={`text-[15px] font-medium truncate ${value ? 'text-[#0d315c]' : 'text-gray-300'}`}>
            {value ? options.find(o => o.value === value)?.label : placeholder}
          </span>
        </div>
        <FaChevronDown className={`text-gray-400 text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-[100] top-full mt-2 left-0 right-0 bg-white cut-corner-panel shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-50 overflow-hidden animate-fade-in-up">
          <div className="p-3 border-b border-gray-50">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm outline-none text-[#0d315c]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto no-scrollbar py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div 
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-6 py-3 text-[14px] font-medium flex items-center justify-between cursor-pointer transition-colors ${value === opt.value ? 'bg-[#019e6e]/5 text-[#019e6e]' : 'text-[#0d315c]/70 hover:bg-gray-50'}`}
                >
                  {opt.label}
                  {value === opt.value && <FaCheckCircle className="text-xs" />}
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-xs text-gray-400 text-center italic">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PremiumPhdForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    department: '',
    course: '',
    agree: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const states = [
    { label: 'Telangana', value: 'telangana' },
    { label: 'Andhra Pradesh', value: 'andhra' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Tamil Nadu', value: 'tamilnadu' },
    { label: 'Delhi', value: 'delhi' }
  ];

  const departments = [
    { label: 'School of Rehabilitation Sciences', value: 'rehab' },
    { label: 'School of Health Sciences', value: 'health' },
    { label: 'School of Engineering', value: 'engineering' },
    { label: 'School of Psychology', value: 'psychology' },
    { label: 'School of Management', value: 'management' }
  ];

  const courses = [
    { label: 'Doctor of Philosophy (Ph.D.)', value: 'phd' },
    { label: 'Integrated M.Tech + Ph.D.', value: 'integrated' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please agree to the terms');
      return;
    }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setSubmitStatus('success');
  };

  if (submitStatus === 'success') {
    return (
      <div className="w-full max-w-md mx-auto py-16 px-8 text-center bg-white cut-corner-panel border border-slate-200 animate-fade-in shadow-2xl">
        <div className="w-24 h-24 bg-[#019e6e] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#019e6e]/20 animate-bounce-subtle">
          <FaCheckCircle className="text-white text-4xl" />
        </div>
        <h3 className="text-3xl font-black text-[#0d315c] mb-4 uppercase tracking-tighter italic">Application Sent.</h3>
        <p className="text-[#0d315c]/60 font-semibold text-base leading-relaxed mb-10">Our doctoral research committee will review your profile and reach out via email.</p>
        <button onClick={() => setSubmitStatus(null)} className="px-8 py-3 bg-[#0d315c] text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#019e6e] transition-all shadow-lg active:scale-95">New Enquiry</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-6">
      
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-[#ffaf3a]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-12 border border-[#ffaf3a]/20">
          <FaGlobe className="text-[#ffaf3a] text-2xl" />
        </div>
        <h2 className="text-[#0d315c] text-4xl font-black uppercase tracking-tighter leading-[0.85] mb-4 italic">
          Research <br/> Selection.
        </h2>
        <p className="text-[#0d315c]/40 font-bold text-[10px] uppercase tracking-[0.4em]">Admissions Cycle 2026</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input 
          type="text" 
          placeholder="Full Name*" 
          required 
          className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-[15px] font-medium text-[#0d315c] outline-none transition-all placeholder:text-gray-200 shadow-sm focus:border-[#019e6e] focus:ring-4 focus:ring-[#019e6e]/5"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />

        <input 
          type="email" 
          placeholder="Contact Email*" 
          required 
          className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-[15px] font-medium text-[#0d315c] outline-none transition-all placeholder:text-gray-200 shadow-sm focus:border-[#019e6e] focus:ring-4 focus:ring-[#019e6e]/5"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <div className="flex gap-4">
          <div className="w-[100px] bg-white border border-gray-100 rounded-2xl px-4 py-4 flex items-center justify-center gap-2 shadow-sm">
             <img src="https://flagcdn.com/w20/in.png" className="w-5" alt="IN" />
             <span className="text-[14px] font-black text-[#0d315c]">+91</span>
          </div>
          <input 
            type="tel" 
            placeholder="Mobile Number*" 
            required 
            className="flex-1 bg-white border border-gray-100 rounded-2xl px-6 py-4 text-[15px] font-medium text-[#0d315c] outline-none transition-all placeholder:text-gray-200 shadow-sm focus:border-[#019e6e] focus:ring-4 focus:ring-[#019e6e]/5"
            value={formData.mobile}
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          />
        </div>

        <CustomSelect 
          placeholder="State Area" 
          options={states} 
          value={formData.state} 
          onChange={(val) => setFormData({...formData, state: val})} 
        />

        <CustomSelect 
          placeholder="Department Interest" 
          options={departments} 
          value={formData.department} 
          onChange={(val) => setFormData({...formData, department: val})} 
        />

        <CustomSelect 
          placeholder="Target Programme" 
          options={courses} 
          value={formData.course} 
          onChange={(val) => setFormData({...formData, course: val})} 
        />

        <div className="flex items-center gap-4 py-3 px-1">
          <input 
            type="checkbox" 
            id="phd-agree" 
            className="w-5 h-5 rounded-md border-gray-200 text-[#019e6e] focus:ring-[#019e6e]/10 shadow-sm cursor-pointer"
            checked={formData.agree}
            onChange={(e) => setFormData({...formData, agree: e.target.checked})}
          />
          <label htmlFor="phd-agree" className="text-[11px] font-bold text-[#0d315c]/60 leading-tight cursor-pointer uppercase tracking-tight">
            I certify the accuracy of my research data*
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#0066ff] hover:bg-[#005bdc] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(0,102,255,0.25)] group active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="text-[17px] tracking-tight uppercase italic">Initiate Enquiry</span>
              <FaPaperPlane className="text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default PremiumPhdForm;
