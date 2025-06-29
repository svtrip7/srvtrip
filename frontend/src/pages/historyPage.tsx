import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, RefreshCwIcon } from "lucide-react";
import { handleFetchItineraries } from "@/api/itineraryfetch";
import { appenditinerary, setItineraries } from "@/store/slices/itinerarySlice";
import { appendPlaces, setPlaces } from "@/store/slices/placeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function HistoryPage() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // All hooks must be called at the top level, before any early returns
    const [selectedItineraryIndex, setSelectedItineraryIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const itineraries = useSelector((state: any) => state.itinerary.itineraries);
    
    useEffect(() => {
        setIsInitialLoading(true);
        // console.log("tyao")
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/itineraries`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
          },
          credentials: "include",
      }).then(async (response) => {
        // console.log("response")
        const data = await response.json();
        dispatch(setItineraries(data.itineraries));
        dispatch(setPlaces(data.placesData));
      }).catch((err)=>{
        console.log(err)
      }).finally(() => {
        setIsInitialLoading(false);
      })
    },[])
    
    // console.log("Itineraries from Redux:", itineraries);
    
    const storedIds = itineraries
        ? itineraries.map((itinerary: any) => itinerary?.itinerary?.id).filter(Boolean)
        : [];
    const handleViewDetails = (itinerarynumber: number) => {
        // console.log("View details for itinerary ID:", itinerarynumber);
        // Navigate to the itinerary details page
        navigate(`/itinerary/${itinerarynumber}`);
    };
    
    const fetchItineraries = async () => {
        // console.log("request reach here");
        setIsLoading(true);
        try {
            const response = await handleFetchItineraries(storedIds);
            // console.log("Fetched itineraries:", response);
            dispatch(appenditinerary(response.itineraries));
            dispatch(appendPlaces(response.placesData));
        } catch (error: any) {
            // console.error("Error fetching itineraries:", error);
            
            // Handle rate limiting errors specifically
            const errorMessage = error.message || "Failed to fetch itineraries";
            
            if (errorMessage.includes("Too many sync requests")) {
                toast.error("Rate Limit: Too many sync requests. Please wait a few minutes before trying again.", {
                    duration: 6000,
                });
            } else if (errorMessage.includes("Rate limit exceeded")) {
                toast.error("Rate Limit: Please wait a moment before trying again.", {
                    duration: 5000,
                });
            } else {
                toast.error(`Sync Failed: ${errorMessage}`, {
                    duration: 4000,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Show skeleton while initial loading OR when itineraries is null (being fetched by ProtectedRoute)
    if (isInitialLoading || !itineraries) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-4 pt-28 pb-12">
                <div className="max-w-2xl w-full mx-auto">
                    {/* Header skeleton */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                        <div className="h-8 md:h-12 w-64 bg-gray-800 rounded-lg animate-pulse mb-3 md:mb-0"></div>
                        <div className="h-10 w-full md:w-48 bg-gray-800 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Navigation indicators skeleton */}
                    <div className="flex justify-center mb-6 gap-2">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="w-8 h-1.5 bg-gray-800 rounded-full animate-pulse"></div>
                        ))}
                    </div>

                    {/* Main card skeleton */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-700 backdrop-blur-md shadow-xl">
                        <div className="bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/70 p-4 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left column skeleton */}
                                <div className="flex-1">
                                    {/* Title skeleton */}
                                    <div className="mb-6">
                                        <div className="h-10 md:h-12 w-48 bg-gray-800 rounded-lg animate-pulse mb-2"></div>
                                        <div className="h-5 w-32 bg-gray-800 rounded animate-pulse"></div>
                                    </div>

                                    {/* Info items skeleton */}
                                    <div className="space-y-6">
                                        {[1, 2, 3].map((_, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-800 rounded-full animate-pulse"></div>
                                                <div>
                                                    <div className="h-3 w-16 bg-gray-800 rounded animate-pulse mb-1"></div>
                                                    <div className="h-5 w-24 bg-gray-800 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right column skeleton */}
                                <div className="flex-1">
                                    {/* Budget summary skeleton */}
                                    <div className="bg-black/30 border border-gray-700 rounded-xl p-5 mb-6">
                                        <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-3"></div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
                                                <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="h-4 w-28 bg-gray-800 rounded animate-pulse"></div>
                                                <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-800 rounded-full animate-pulse mt-3"></div>
                                        </div>
                                    </div>

                                    {/* Interests skeleton */}
                                    <div>
                                        <div className="h-5 w-20 bg-gray-800 rounded animate-pulse mb-3"></div>
                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5].map((_, index) => (
                                                <div key={index} className="h-7 w-16 bg-gray-800 rounded-full animate-pulse"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button skeleton */}
                            <div className="mt-8 text-center">
                                <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse mx-auto"></div>
                            </div>
                        </div>
                    </div>

                    {/* Extended interests section skeleton */}
                    <div className="mt-8 relative overflow-hidden rounded-2xl border border-gray-700 backdrop-blur-md shadow-xl">
                        <div className="bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/70 p-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((_, index) => (
                                    <div key={index} className="bg-gray-800/60 rounded-lg overflow-hidden">
                                        <div className="p-4">
                                            <div className="h-5 w-24 bg-gray-700 rounded animate-pulse mb-3"></div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {[1, 2, 3].map((_, subIndex) => (
                                                    <div key={subIndex} className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Early return AFTER all hooks are called to follow Rules of Hooks
    if (itineraries.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-blue-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">No Itineraries Found</h2>
                    <p className="text-gray-400 mb-6">
                        You haven't created any itineraries yet.
                    </p>
                    <motion.button
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 overflow-hidden group relative"
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={fetchItineraries}
                    >
                        <motion.span
                            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                            transition={isLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                        >
                            <RefreshCwIcon className="w-5 h-5" />
                        </motion.span>
                        <span>Fetch Itineraries From DB</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    </motion.button>
                </div>
            </div>
        );
    }

    const selectedItinerary = itineraries[selectedItineraryIndex]?.itinerary;

    // Map interest keywords to icons and categories
    const interestIcons: Record<string, { icon: string; category: string }> = {
        "beach": { icon: "🏖️", category: "Nature" },
        "mountains": { icon: "🏔️", category: "Nature" },
        "hiking": { icon: "🥾", category: "Activities" },
        "city": { icon: "🏙️", category: "Urban" },
        "history": { icon: "🏛️", category: "Culture" },
        "food": { icon: "🍴", category: "Lifestyle" },
        "adventure": { icon: "🧗‍♂️", category: "Activities" },
        "relaxation": { icon: "🧘‍♀️", category: "Lifestyle" },
        "shopping": { icon: "🛍️", category: "Urban" },
        "nature": { icon: "🌿", category: "Nature" },
        "culture": { icon: "🎭", category: "Culture" },
        "nightlife": { icon: "🌃", category: "Lifestyle" },
        "architecture": { icon: "🏰", category: "Culture" },
        "art": { icon: "🎨", category: "Culture" },
        "music": { icon: "🎵", category: "Culture" },
        "local experiences": { icon: "👨‍👩‍👧‍👦", category: "Lifestyle" }
    };

    // Get interest categories if interests exist
    const getInterestCategories = () => {
        if (!selectedItinerary?.interests) return {};

        const categories: Record<string, { icon: string; interests: string[] }> = {};

        // Handle both string and array types
        const interestsArray = Array.isArray(selectedItinerary.interests)
            ? selectedItinerary.interests
            : typeof selectedItinerary.interests === 'string'
                ? selectedItinerary.interests.split(',')
                : [];

        interestsArray.forEach((interest: string) => {
            if (typeof interest !== 'string') return;

            const trimmed: string = interest.trim().toLowerCase();

            // Find a matching interest or use default
            const key: string = Object.keys(interestIcons).find((k: string) =>
                trimmed.includes(k) || k.includes(trimmed)
            ) || trimmed;

            const { icon, category }: { icon: string; category: string } = interestIcons[key] || { icon: "✨", category: "Other" };

            if (!categories[category]) {
                categories[category] = { icon: icon, interests: [] };
            }

            categories[category].interests.push(interest.trim());
        });

        return categories;
    };

    const interestCategories = getInterestCategories();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 pt-28 pb-12"> {/* Changed pt-30 to pt-20 and added pb-12 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full mx-auto"
            >
                <div className="flex flex-col md:flex-row items-center justify-between mb-6"> {/* Changed mb-8 to mb-6 for mobile */}
                    <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Your Travel History
                    </h1>

                    <motion.button
                        className="mt-3 md:mt-0 w-full md:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 relative overflow-hidden group"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fetchItineraries()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.span
                            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                            transition={isLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                        >
                            <RefreshCwIcon className="w-4 h-4" />
                        </motion.span>
                        <span>Fetch Itineraries From DB</span>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                    </motion.button>
                </div>

                {itineraries.length > 1 && (
                    <div className="flex justify-center mb-4 md:mb-6 gap-2">
                        {itineraries.map((_: unknown, index: number) => (
                            <motion.button
                                key={`indicator-${index}`}
                                className={`w-8 h-1.5 rounded-full transition-all ${
                                    selectedItineraryIndex === index
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 w-12"
                                        : "bg-gray-700 hover:bg-gray-600"
                                }`}
                                onClick={() => setSelectedItineraryIndex(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        ))}
                    </div>
                )}

                {/* Container for card and navigation buttons */}
                <div className="relative">
                    {/* Navigation Buttons - Adjusted for better mobile experience */}
                    {itineraries.length > 1 && (
                        <>
                            {/* Previous Button */}
                            <motion.button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-16 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 border border-blue-500/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg z-20"
                                onClick={() => setSelectedItineraryIndex(prev => (prev === 0 ? itineraries.length - 1 : prev - 1))}
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <ChevronLeftIcon className="w-4 h-4 md:w-6 md:h-6" />
                            </motion.button>

                            {/* Next Button */}
                            <motion.button
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-16 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 border border-blue-500/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg z-20"
                                onClick={() => setSelectedItineraryIndex(prev => (prev === itineraries.length - 1 ? 0 : prev + 1))}
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6" />
                            </motion.button>
                        </>
                    )}

                    <motion.div
                        layoutId="card"
                        className="relative overflow-hidden rounded-2xl border border-blue-500/20 backdrop-blur-md shadow-xl"
                    >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/70 z-0"></div>

                        {/* Animated glow effects */}
                        <motion.div
                            className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl z-0"
                            animate={{
                                x: [0, 30, 0],
                                y: [0, 20, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl z-0"
                            animate={{
                                x: [0, -30, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Card content */}
                        <div className="relative z-10 p-4 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                                {/* Left column */}
                                <div className="flex-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-4 md:mb-6"
                                    >
                                        <h2 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 capitalize">
                                            {selectedItinerary?.destination}
                                        </h2>
                                        <p className="text-gray-400 text-base md:text-lg">
                                            {selectedItinerary?.number_of_days} Days of Adventure
                                        </p>
                                    </motion.div>

                                    <div className="space-y-4 md:space-y-6">
                                        {[
                                            {
                                                icon: "👥",
                                                label: "Travelers",
                                                value: selectedItinerary?.number_of_persons
                                            },
                                            {
                                                icon: "📅",
                                                label: "Start Date",
                                                value: selectedItinerary?.start_date
                                                    ? new Date(selectedItinerary.start_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })
                                                    : "Not specified"
                                            },
                                            {
                                                icon: "💰",
                                                label: "Budget",
                                                value: `${selectedItinerary?.currency || "₹"}${selectedItinerary?.budget?.toLocaleString() || 0}`
                                            }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + (index * 0.1) }}
                                                className="flex items-center gap-3 md:gap-4"
                                            >
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/30 shadow-lg">
                                                    <span className="text-lg md:text-xl">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-gray-400 text-xs md:text-sm font-medium">{item.label}</h3>
                                                    <p className="text-white text-base md:text-lg font-bold">{item.value}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right column */}
                                <div className="flex-1 mt-4 md:mt-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-black/30 border border-blue-500/20 rounded-xl p-4 md:p-5 mb-4 md:mb-6"
                                    >
                                        <h3 className="text-lg font-bold mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                            Budget Summary
                                        </h3>
                                        <div className="space-y-2 md:space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm md:text-base">Total Budget Used:</span>
                                                <span className="font-bold text-white">{selectedItinerary?.total_budget_used || "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400 text-sm md:text-base">Remaining Budget:</span>
                                                <span className={`font-bold ${selectedItinerary?.remaining_budget?.includes('-') ? 'text-red-400' : 'text-green-400'}`}>
                                                    {selectedItinerary?.remaining_budget || "N/A"}
                                                </span>
                                            </div>

                                            {/* Budget progress bar */}
                                            <div className="mt-2 pt-2 md:mt-3 md:pt-3 border-t border-gray-700">
                                                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full ${
                                                            selectedItinerary?.remaining_budget?.includes('-')
                                                                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                        }`}
                                                        initial={{ width: "0%" }}
                                                        animate={{
                                                            width: selectedItinerary?.total_budget_used
                                                                ? `${Math.min((parseInt(selectedItinerary.total_budget_used.replace(/[^\d]/g, '')) / selectedItinerary.budget) * 100, 100)}%`
                                                                : "0%"
                                                        }}
                                                        transition={{ delay: 0.8, duration: 1.2 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Interests section - mobile optimized */}
                                    {selectedItinerary?.interests && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                                Interests
                                            </h3>
                                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                {(Array.isArray(selectedItinerary?.interests)
                                                    ? selectedItinerary.interests
                                                    : typeof selectedItinerary?.interests === 'string'
                                                        ? selectedItinerary.interests.split(',')
                                                        : []
                                                ).slice(0, 5).map((interest: string | number, index: number) => (
                                                    <motion.span
                                                        key={typeof interest === 'string' ? interest : index}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.8 + (index * 0.1) }}
                                                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-500/30"
                                                    >
                                                        {typeof interest === 'string' ? interest.trim() : String(interest)}
                                                    </motion.span>
                                                ))}
                                                {(Array.isArray(selectedItinerary.interests)
                                                    ? selectedItinerary.interests.length
                                                    : typeof selectedItinerary.interests === 'string'
                                                        ? selectedItinerary.interests.split(',').length
                                                        : 0
                                                ) > 5 && (
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 1.3 }}
                                                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-500/30"
                                                    >
                                                        + {(Array.isArray(selectedItinerary.interests)
                                                            ? selectedItinerary.interests.length
                                                            : typeof selectedItinerary.interests === 'string'
                                                                ? selectedItinerary.interests.split(',').length
                                                                : 0
                                                        ) - 5} more
                                                    </motion.span>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* View details button */}
                            <motion.div
                                className="mt-6 md:mt-8 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <motion.button
                                    className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleViewDetails(selectedItineraryIndex + 1)}
                                >
                                    View Full Itinerary Details
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Enhanced Interests Section - Mobile optimized */}
                    {selectedItinerary?.interests && Object.keys(interestCategories).length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-6 md:mt-8 mb-10 md:mb-20 relative overflow-hidden rounded-2xl border border-blue-500/20 backdrop-blur-md shadow-xl"
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/70 z-0"></div>

                            {/* Animated glow effects */}
                            <motion.div
                                className="absolute bottom-0 -left-20 w-60 h-60 bg-blue-500 rounded-full opacity-10 blur-3xl z-0"
                                animate={{
                                    x: [0, 20, 0],
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 12,
                                    ease: "easeInOut"
                                }}
                            />

                            <div className="relative z-10 p-4 md:p-6 lg:p-8">
                                <div className="flex items-center justify-center mb-4 md:mb-6">
                                    <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow"></div>
                                    <h3 className="text-lg md:text-xl font-bold mx-3 md:mx-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                        Travel Interests
                                    </h3>
                                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-grow"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                    {Object.entries(interestCategories).map(([category, { icon, interests }], catIndex) => (
                                        <motion.div
                                            key={category}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.4 + (catIndex * 0.1) }}
                                            className="bg-gradient-to-br from-gray-900/60 to-black/60 rounded-lg border border-blue-500/20 overflow-hidden"
                                        >
                                            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 flex items-center">
                                                <span className="text-lg mr-2">{icon}</span>
                                                <h4 className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                                    {category}
                                                </h4>
                                            </div>
                                            <div className="p-3">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {interests.map((interest, index) => (
                                                        <motion.div
                                                            key={interest}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 1.6 + (catIndex * 0.1) + (index * 0.05) }}
                                                            whileHover={{ scale: 1.05, y: -2 }}
                                                            className="px-2 py-1 bg-blue-900/20 hover:bg-blue-800/30 text-blue-300 rounded-full text-xs border border-blue-500/20 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/10"
                                                        >
                                                            {interest}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    className="mt-3 md:mt-4 flex justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                >
                                    <div className="text-gray-400 text-xs border-t border-gray-700/50 pt-2 md:pt-3 text-center max-w-md">
                                        Your travel interests help us generate personalized recommendations for your future trips
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}