// does noty do anything rn at runtime


export type BidStatus = "Pending" | "Completed";

export type BidCategory =
  | "Local Government Units (LGUs)"
  | "MSMEs / Large Corporations";

export interface Bid {
  id: string;
  title: string;
  organization: string;
  category: BidCategory;
  submittedAt: string;
  status: BidStatus;
  image: string;
  keyVisual?: string;
  projectVideo?: string;
  bidDocument?: string;
  supportingDocuments?: string;
  description: string;
}
