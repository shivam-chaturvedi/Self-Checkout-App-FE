import react from 'react';

export default function SurveillancePage({imageUrl}){
    return(
        <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Surveillance Images</h2>
        
        <div className="h-[80%] verflow-y-auto border p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {imageUrl.map((img) => (
              <div key={img.id} className="border p-4 rounded-lg shadow-md w-full max-w-xs mx-auto">
                <div className="flex justify-center">
                  <img
                    src={img.imageUrl}
                    alt={`Camera ${img.id}`}
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  <span className="font-bold text-purple-600">🆔 Camera ID:</span> {img.id}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">📅 Date & Time: {img.updatedAt}</p>
                <p className="text-red-600 font-bold mt-2">⚠ Security Threat Detected:</p>
                <p className="text-red-500">{img.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

}