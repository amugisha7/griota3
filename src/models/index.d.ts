import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerLoanApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoanApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly profilepic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLoanApplication = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoanApplication, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly profilepic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LoanApplication = LazyLoading extends LazyLoadingDisabled ? EagerLoanApplication : LazyLoanApplication

export declare const LoanApplication: (new (init: ModelInit<LoanApplication>) => LoanApplication) & {
  copyOf(source: LoanApplication, mutator: (draft: MutableModel<LoanApplication>) => MutableModel<LoanApplication> | void): LoanApplication;
}