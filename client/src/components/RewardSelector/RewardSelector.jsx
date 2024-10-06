import React, { useState, useEffect } from 'react'
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
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
import { Toast } from "../ui/toast"
import { motion, AnimatePresence } from "framer-motion"


// This function simulates fetching rewards from a database
const fetchRewards = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  // In a real application, this would be an API call
  return [
    { id: 1, text: "Extra break time" },
    { id: 2, text: "Favorite snack" },
    { id: 3, text: "Movie night" },
    { id: 4, text: "Sleep in late" },
    { id: 5, text: "Video game session" },
  ]
}

export default function RewardSelector() {
  const [rewards, setRewards] = useState([])
  const [selectedReward, setSelectedReward] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const getRewards = async () => {
      try {
        setLoading(true)
        const fetchedRewards = await fetchRewards()
        setRewards(fetchedRewards)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch rewards')
        setLoading(false)
      }
    }
    getRewards()
  }, [])

  const handleRewardSelect = (reward) => {
    setSelectedReward(reward)
    setOpen(false)
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
            <p>{reward.text}</p>
          </motion.div>
        </AnimatePresence>
      ),
      duration: 3000,
    })
  }

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Select Reward</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a Reward</DialogTitle>
          </DialogHeader>
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
                      {reward.text}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      {selectedReward && (
        <p className="mt-4">Selected Reward: {selectedReward.text}</p>
      )}
    </div>
  )
}