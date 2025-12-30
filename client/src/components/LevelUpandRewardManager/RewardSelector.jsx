import React, { useState, useEffect } from 'react'
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Check, Crown } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { apiRequest } from "../../lib/apiRequest" // Import helper

export default function RewardSelector({ onClose }) {
  const [rewards, setRewards] = useState([])
  const [selectedReward, setSelectedReward] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const getRewards = async () => {
      try {
        setLoading(true)
        // CLEANER: GET request
        const fetchedRewards = await apiRequest('/rewards', 'GET');
        setRewards(fetchedRewards)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching rewards:', err)
        setError('Failed to fetch rewards. Please try again.')
        setLoading(false)
      }
    }
    getRewards()
  }, [])

  const handleRewardSelect = (reward) => {
    setSelectedReward(reward)
    toast({
      title: "Reward Claimed!",
      description: (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Crown className="w-6 h-6 text-yellow-500" />
            </motion.div>
            <p>{reward.description}</p>
          </motion.div>
        </AnimatePresence>
      ),
      duration: 3000,
    })
    onClose()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[425px] max-w-full">
      <h2 className="text-2xl font-light font-pixelify mb-4 ">Select a Reward</h2>
      <Command>
        <CommandInput placeholder="Search rewards..." />
        <CommandList>
          <CommandEmpty>No rewards found.</CommandEmpty>
          <CommandGroup>
            {loading ? (
              <CommandItem>Loading rewards...</CommandItem>
            ) : error ? (
              <CommandItem>{error}</CommandItem>
            ) : (
              rewards.map((reward) => (
                <CommandItem
                  key={reward.id}
                  onSelect={() => handleRewardSelect(reward)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedReward?.id === reward.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {reward.description}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
      <Button onClick={onClose} className="font-pixelify font-thin bg-[var(--text-color-light)] text-[var(--background-color)] rounded-none border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[3px] transition-none my-5">Close</Button>
    </div>
  )
}