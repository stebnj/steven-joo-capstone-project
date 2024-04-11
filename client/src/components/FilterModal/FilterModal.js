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
    <div>
        <div>
            <h2>
                Filter Listings
            </h2>
            <form onSubmit={handleApply}>
                <input name="minRent" type="number" placeholder='Min Rent' />
                <input name="maxRent" type="number" placeholder='Max Rent' />
                <select name="bedRange">
                    <option value="">Any</option>
                    <option value="1">1 Bed</option>
                    <option value="2">2 Beds</option>
                    <option value="3">3 Beds</option>
                </select>
                <button type="submit">Apply Filters</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  )
}
