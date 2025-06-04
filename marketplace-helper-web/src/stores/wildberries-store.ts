import { makeAutoObservable, reaction } from 'mobx';

import {
  fetchProcessWbFeedback,
  fetchProcessWbQuestion,
  fetchWbFeedbacks,
  fetchWbQuestions,
} from '@/api';
import { WILDBERRIES_TAB_LABEL, WildberriesTab } from '@/constants';
import type { IFeedback, IQuestion } from '@/interfaces';

class WildberriesStore {
  activeTab: WildberriesTab = WildberriesTab.FEEDBACKS;
  isLoading: boolean = false;
  isProcessing: boolean = false;
  feedbacks: IFeedback[] = [];
  questions: IQuestion[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    reaction(
      () => this.activeTab,
      (activeTab) => {
        switch (activeTab) {
          case WildberriesTab.FEEDBACKS:
            this.fetchFeedbacks();
            break;
          case WildberriesTab.QUESTIONS:
            this.fetchQuestions();
            break;
          default:
            break;
        }
      },
      {
        fireImmediately: true,
      }
    );
  }

  setActiveTab(activeTab: WildberriesTab) {
    this.activeTab = activeTab;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsProcessing(isProcessing: boolean) {
    this.isProcessing = isProcessing;
  }

  setFeedbacks(feedbacks: IFeedback[]) {
    this.feedbacks = feedbacks;
  }

  setQuestions(questions: IQuestion[]) {
    this.questions = questions;
  }

  resetStore() {
    this.setIsLoading(false);
    this.setIsProcessing(false);
    this.setFeedbacks([]);
    this.setQuestions([]);
  }

  get headerTabs() {
    return Object.values(WildberriesTab).map((tab) => ({ label: WILDBERRIES_TAB_LABEL[tab], tab }));
  }

  async fetchFeedbacks() {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchWbFeedbacks();

    if (isSuccess) {
      this.setFeedbacks(data);
    }

    this.setIsLoading(false);
  }

  async processFeedbacks(feedbacks: IFeedback[]) {
    this.setIsProcessing(true);

    const feedbacksToProcess = feedbacks.filter((feedback) => !feedback.replyText);

    for await (const feedback of feedbacksToProcess) {
      const { isSuccess, data } = await fetchProcessWbFeedback(feedback.feedbackId);

      if (isSuccess) {
        const updatedFeedbacks = this.feedbacks.map((item) =>
          item.feedbackId === feedback.feedbackId ? data : item
        );

        this.setFeedbacks(updatedFeedbacks);
      }
    }

    this.setIsProcessing(false);
  }

  async fetchQuestions() {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchWbQuestions();

    if (isSuccess) {
      this.setQuestions(data);
    }

    this.setIsLoading(false);
  }

  async processQuestions(questions: IQuestion[]) {
    this.setIsProcessing(true);

    const questionsToProcess = questions.filter((question) => !question.answerText);

    for await (const question of questionsToProcess) {
      const { isSuccess, data } = await fetchProcessWbQuestion(question.questionId);

      if (isSuccess) {
        const updatedQuestions = this.questions.map((item) =>
          item.questionId === question.questionId ? data : item
        );

        this.setQuestions(updatedQuestions);
      }
    }

    this.setIsProcessing(false);
  }
}

export default new WildberriesStore();
