import React from 'react'

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
    <div className='modal'>
        <div className='modal__heading-container'>
            <h2 className='modal__heading'>
                Filter Listings
            </h2>
        </div>
        <div className='modal__form-container'>
            <form className='modal__form' onSubmit={handleApply}>
                <input className='modal__input' name="minRent" type="number" placeholder='Min Rent' />
                <input className='modal__input' name="maxRent" type="number" placeholder='Max Rent' />
                <select className='modal__select' name="bedRange">
                    <option className='modal__option' value="">Any</option>
                    <option className='modal__option' value="1 Bed">1 Bed</option>
                    <option className='modal__option' value="2 Beds">2 Beds</option>
                    <option className='modal__option' value="3 Beds">3 Beds</option>
                </select>
                <button className='modal__button' type="submit">Apply Filters</button>
                <button className='modal__button' type="button" onClick={onClose}>Close</button>
            </form>
        </div>
        
    </div>
  )
}
