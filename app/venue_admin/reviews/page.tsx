'use client'

import { useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getReviews, Review } from '@/lib/venue-admin-data'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [respondedFilter, setRespondedFilter] = useState<'all' | 'responded' | 'unresponded'>(
    'all'
  )
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getReviews()
        setReviews(data)
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  }, [])

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = ratingFilter === null || review.rating === ratingFilter
    const matchesResponded =
      respondedFilter === 'all' ||
      (respondedFilter === 'responded' && review.reply) ||
      (respondedFilter === 'unresponded' && !review.reply)
    return matchesRating && matchesResponded
  })

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  const handleReply = (review: Review) => {
    setSelectedReview(review)
    setReplyText(review.reply || '')
    setReplyDialogOpen(true)
  }

  const handleSaveReply = () => {
    // TODO: API call to save reply
    setReplyDialogOpen(false)
    setReplyText('')
  }

  if (loading) {
    return <VenueAdminLayout title="Reviews">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="Reviews">
      <div className="space-y-6">
        {/* Rating Breakdown */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Rating Breakdown</h3>
          <div className="space-y-3">
            {([5, 4, 3, 2, 1] as const).map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  setRatingFilter(ratingFilter === rating ? null : rating)
                }
                className="w-full flex items-center gap-4 rounded-lg hover:bg-white/5 p-2 transition"
              >
                <div className="flex items-center gap-1 w-20">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating
                          ? 'text-[#C9A961] text-lg'
                          : 'text-white/20 text-lg'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A961]"
                    style={{
                      width: `${
                        reviews.length > 0
                          ? (ratingCounts[rating] / reviews.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="w-12 text-right text-sm text-muted-foreground">
                  {ratingCounts[rating]}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={respondedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setRespondedFilter('all')}
            className="cursor-pointer"
          >
            All
          </Badge>
          <Badge
            variant={respondedFilter === 'responded' ? 'default' : 'outline'}
            onClick={() => setRespondedFilter('responded')}
            className="cursor-pointer"
          >
            Responded
          </Badge>
          <Badge
            variant={respondedFilter === 'unresponded' ? 'default' : 'outline'}
            onClick={() => setRespondedFilter('unresponded')}
            className="cursor-pointer"
          >
            Unresponded
          </Badge>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="p-6 border-white/10 bg-card">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A961]/20">
                      <span className="text-sm font-bold text-[#C9A961]">
                        {review.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{review.customerName}</p>
                      <p className="text-xs text-muted-foreground">{review.packageName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? 'text-[#C9A961]'
                            : 'text-white/20'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="mb-4 text-foreground">{review.text}</p>

              {review.reply ? (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-[#C9A961]" />
                    <span className="text-sm font-medium text-muted-foreground">Your Reply</span>
                  </div>
                  <p className="text-sm text-foreground">{review.reply}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Replied on {new Date(review.replyDate!).toLocaleDateString()}
                  </p>
                </div>
              ) : null}

              <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    onClick={() => handleReply(review)}
                    className={
                      review.reply
                        ? 'bg-white/10 hover:bg-white/20 text-foreground'
                        : 'bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]'
                    }
                  >
                    {review.reply ? 'Edit Reply' : 'Reply'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#111827] border-white/10 text-foreground">
                  <DialogHeader>
                    <DialogTitle>Reply to Review</DialogTitle>
                    <DialogDescription>
                      Respond to {review.customerName}&apos;s review of{' '}
                      {review.packageName}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <p className="text-sm text-foreground">&quot;{review.text}&quot;</p>
                    </div>
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="min-h-32 bg-white/5 border-white/10"
                    />
                    <Button
                      onClick={handleSaveReply}
                      className="w-full bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
                    >
                      {review.reply ? 'Update Reply' : 'Post Reply'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <Card className="p-8 text-center border-white/10 bg-card">
            <p className="text-muted-foreground">No reviews found matching your filters.</p>
          </Card>
        )}
      </div>
    </VenueAdminLayout>
  )
}
