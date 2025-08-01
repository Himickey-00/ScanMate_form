// app/store/formStore.ts
import { createStore } from 'zustand/vanilla'
import { create } from 'zustand'

type FormState = {
  companyName: string
  companyNameKana: string
  representativeName: string
  representativeNameKana: string
  contactName: string
  contactNameKana: string
  phoneNumber1: string
  phoneNumber2: string
  phoneNumber3: string
  mobileNumber1: string
  mobileNumber2: string
  mobileNumber3: string
  email: string
  emailConfirm: string
  postalCode: string
  prefecture: string
  cityWard: string
  building: string
  buildingDetail: string
  agencyRepName: string
  agencyRepNameKana: string
  agencyName: string
  agencyCode: string
  sameAsRepresentative: boolean

  errors: Record<string, string>;
  setErrors: (value: Record<string, string>) => void;
  touched: Record<string, boolean>;
  setTouched: (value: Record<string, boolean>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;

  setCompanyName: (value: string) => void
  setCompanyNameKana: (value: string) => void
  setRepresentativeName: (value: string) => void
  setRepresentativeNameKana: (value: string) => void
  setContactName: (value: string) => void
  setContactNameKana: (value: string) => void
  setPhoneNumber1: (value: string) => void
  setPhoneNumber2: (value: string) => void
  setPhoneNumber3: (value: string) => void
  setMobileNumber1: (value: string) => void
  setMobileNumber2: (value: string) => void
  setMobileNumber3: (value: string) => void
  setEmail: (value: string) => void
  setEmailConfirm: (value: string) => void
  setPostalCode: (value: string) => void
  setPrefecture: (value: string) => void
  setCityWard: (value: string) => void
  setBuilding: (value: string) => void
  setBuildingDetail: (value: string) => void
  setAgencyRepName: (value: string) => void
  setAgencyRepNameKana: (value: string) => void
  setAgencyName: (value: string) => void
  setAgencyCode: (value: string) => void
  setSameAsRepresentative: (value: boolean) => void

  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
  serviceStartDate: string;
  setServiceStartDate: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;

  formData: Omit<FormState, 'formData' | 'setFormData' | 'setErrors' | 'setTouched' | 'setCurrentStep'>;
  setFormData: (value: Partial<FormState>) => void;
}

export const useFormStore = create<FormState>((set) => ({
  companyName: '',
  companyNameKana: '',
  representativeName: '',
  representativeNameKana: '',
  contactName: '',
  contactNameKana: '',
  phoneNumber1: '',
  phoneNumber2: '',
  phoneNumber3: '',
  mobileNumber1: '',
  mobileNumber2: '',
  mobileNumber3: '',
  email: '',
  emailConfirm: '',
  postalCode: '',
  prefecture: '',
  cityWard: '',
  building: '',
  buildingDetail: '',
  agencyRepName: '',
  agencyRepNameKana: '',
  agencyName: '',
  agencyCode: '',
  sameAsRepresentative: false,

  errors: {},
  setErrors: (value) => set({ errors: value }),
  touched: {},
  setTouched: (value) => set({ touched: value }),
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),

  setCompanyName: (value: string) => set({ companyName: value }),
  setCompanyNameKana: (value: string) => set({ companyNameKana: value }),
  setRepresentativeName: (value: string) => set({ representativeName: value }),
  setRepresentativeNameKana: (value: string) => set({ representativeNameKana: value }),
  setContactName: (value: string) => set({ contactName: value }),
  setContactNameKana: (value: string) => set({ contactNameKana: value }),
  setPhoneNumber1: (value: string) => set({ phoneNumber1: value }),
  setPhoneNumber2: (value: string) => set({ phoneNumber2: value }),
  setPhoneNumber3: (value: string) => set({ phoneNumber3: value }),
  setMobileNumber1: (value: string) => set({ mobileNumber1: value }),
  setMobileNumber2: (value: string) => set({ mobileNumber2: value }),
  setMobileNumber3: (value: string) => set({ mobileNumber3: value }),
  setEmail: (value: string) => set({ email: value }),
  setEmailConfirm: (value: string) => set({ emailConfirm: value }),
  setPostalCode: (value: string) => set({ postalCode: value }),
  setPrefecture: (value: string) => set({ prefecture: value }),
  setCityWard: (value: string) => set({ cityWard: value }),
  setBuilding: (value: string) => set({ building: value }),
  setBuildingDetail: (value: string) => set({ buildingDetail: value }),
  setAgencyRepName: (value: string) => set({ agencyRepName: value }),
  setAgencyRepNameKana: (value: string) => set({ agencyRepNameKana: value }),
  setAgencyName: (value: string) => set({ agencyName: value }),
  setAgencyCode: (value: string) => set({ agencyCode: value }),
  setSameAsRepresentative: (value: boolean) => set({ sameAsRepresentative: value }),

  selectedPlan: '',
  setSelectedPlan: (value: string) => set({ selectedPlan: value }),
  serviceStartDate: '',
  setServiceStartDate: (value: string) => set({ serviceStartDate: value }),
  cardNumber: '',
  setCardNumber: (value: string) => set({ cardNumber: value }),
  cardName: '',
  setCardName: (value: string) => set({ cardName: value }),
  expiry: '',
  setExpiry: (value: string) => set({ expiry: value }),
  cvv: '',
  setCvv: (value: string) => set({ cvv: value }),

  formData: {} as Omit<FormState, 'formData' | 'setFormData' | 'setErrors' | 'setTouched' | 'setCurrentStep'>,
  setFormData: (value) => set((state) => ({
    ...value
  })),
}))