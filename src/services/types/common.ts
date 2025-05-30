export interface PaginationEdge<Item = any> {
  cursor: string;
  item: Item;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface PaginationConnection<Item = any> {
  totalCount: number;
  list: PaginationEdge<Item>[];
  pageInfo: PageInfo;
}

export interface Pagination<Schema> {
  list: Schema;
}

export interface VerificationForm {
  email: string;
  otpCode: string;
  expiredTime?: Date;
  fromPage?: string;
  password?: string;
}

export interface SignUpForm {
  // firstName: string;
  // lastName: string;
  // email: string;
  username: string;
  password: string;

  // confirmationPassword: string;
  // countryCode: string;
  // phone: string;
  // phoneCode?: string;
  // isAgree?: boolean;
  // subscribeNewsletter?: boolean;
}

export interface RegisterForm {
  username: string;
  password: string;
  passwordVerify: string;
  name: string;
  email: string;
  phone: string;
}

export interface DataItem {
  id: string;
  title?: string;
  content: string;
  updated_at?: string;
  created_at: string;
  author?: string;
  video: string;
  description: string;
  image?: string;
  password: string;
}

export type CheckedItem = Record<string, boolean>;

export interface TextEditorProps {
  initialData: string;
  onChange?: (event: any, editor: any) => void;
}