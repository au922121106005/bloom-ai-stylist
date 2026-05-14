import { Link } from 'react-router-dom'

export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex gap-3 items-center justify-between">
      {/* Image */}
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded flex-shrink-0"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/100?text=' + item.name
        }}
      />
      
      {/* Product Name */}
      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`} className="text-sm font-semibold text-gray-800 hover:text-blue-500 block truncate">
          {item.name}
        </Link>
        <p className="text-xs text-green-500 font-semibold">₹{item.price}</p>
      </div>
      
      {/* Add/Remove Buttons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button 
          onClick={() => onUpdate(item.id, (item.quantity || 1) - 1)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 font-bold"
        >
          −
        </button>
        <span className="px-2 font-bold text-sm w-8 text-center">{item.quantity || 1}</span>
        <button 
          onClick={() => onUpdate(item.id, (item.quantity || 1) + 1)}
          className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600 font-bold"
        >
          +
        </button>
      </div>
      
      {/* Total Amount */}
      <div className="text-sm font-bold text-green-600 flex-shrink-0 w-16 text-right">
        ₹{(item.price * (item.quantity || 1))}
      </div>
      
      {/* Delete Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 font-bold flex-shrink-0"
      >
        Delete
      </button>
    </div>
  )
}
