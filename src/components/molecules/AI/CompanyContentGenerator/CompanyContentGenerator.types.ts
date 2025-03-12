import { GenerateCompanyContentResponse } from '@hooks/AI/useGenerateCompanyContent';

export interface CompanyContentGeneratorProps {
  onGenerate: (content: GenerateCompanyContentResponse) => void;
}
