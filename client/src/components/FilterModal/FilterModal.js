import React from 'react'
import xicon from '../../assets/icons/close-24px.svg'
import './FilterModal.scss'

export default function FilterModal ({ isOpen, onClose, onApplyFilters }) {
    if(!isOpen){
        return null
    }

    const handleApply = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const filters = {
            minRent: formData.get('minRent'),
            maxRent: formData.get('maxRent'),
            bedRange: formData.get('bedRange')
        };
        onApplyFilters(filters);
        onClose();
    }

  return (
    <section className='modal'>
        <div className='modal__overlay'>
            <section className='modal__heading-container'>
                <h2 className='modal__heading'>
                    Filter Listings
                </h2>                    
                <img src={xicon} className='modal__image' onClick={onClose}
                    />
            </section>
            <section className='modal__form-container'>
                <form className='modal__form' onSubmit={handleApply}>
                    <div className='modal__actions'>
                        <div className='modal__input-container'>
                            <input className='modal__input' name="minRent" type="number" placeholder='Min Rent' />
                            <input className='modal__input' name="maxRent" type="number" placeholder='Max Rent' />
                        </div>
                        <select className='modal__select' name="bedRange">
                            <option className='modal__option' value="">Any</option>
                            <option className='modal__option' value="1 Bed">1 Bed</option>
                            <option className='modal__option' value="2 Beds">2 Beds</option>
                            <option className='modal__option' value="3 Beds">3 Beds</option>
                        </select>
                    </div>
                    <div className='modal__button-container'>
                        <button className='modal__button modal__cancel'  type="submit" onClick={onClose}>Cancel</button>
                        <button className='modal__button modal__apply' type="submit">Apply Filters</button>
                    </div>
                        
                </form>
            </section>
        </div>
        
    </section>
  )
}
