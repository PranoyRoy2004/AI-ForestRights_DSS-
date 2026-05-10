export interface ClaimCase {
  id: string
  applicantName: string
  village: string
  district: string
  state: string
  claimType: 'Individual' | 'Community' | 'Habitat'
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Appeal'
  submittedDate: string
  lastUpdated: string
  area: number
  documents: string[]
  notes?: string
  officerAssigned?: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  language?: string
}

export interface DocumentAnalysis {
  title: string
  summary: string
  claimType?: string
  issues: string[]
  recommendations: string[]
  completeness: number
  extractedData: Record<string, string>
}

export interface DashboardStats {
  totalCases: number
  pendingCases: number
  approvedCases: number
  rejectedCases: number
  monthlySubmissions: { month: string; count: number }[]
  districtWise: { district: string; count: number }[]
  claimTypeBreakdown: { type: string; count: number }[]
}