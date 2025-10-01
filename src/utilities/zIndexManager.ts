class ZIndexManager {
  private static instance: ZIndexManager;
  private baseZIndex = 10000;
  private usedZIndexes = new Set<number>();
  private typeBaseZIndexes = new Map<string, number>();

  private constructor() {
    // Define base z-indexes for different component types
    this.typeBaseZIndexes.set('dropdown', 10000);
    this.typeBaseZIndexes.set('modal', 20000);
    this.typeBaseZIndexes.set('tooltip', 30000);
    this.typeBaseZIndexes.set('notification', 40000);
  }

  static getInstance(): ZIndexManager {
    if (!ZIndexManager.instance) {
      ZIndexManager.instance = new ZIndexManager();
    }
    return ZIndexManager.instance;
  }

  getZIndexForType(type: string): number {
    const baseZIndex = this.typeBaseZIndexes.get(type) || this.baseZIndex;
    let zIndex = baseZIndex;

    // Find the next available z-index for this type
    while (this.usedZIndexes.has(zIndex)) {
      zIndex += 10; // Increment by 10 to leave room for stacking
    }

    this.usedZIndexes.add(zIndex);
    return zIndex;
  }

  releaseZIndex(zIndex: number): void {
    this.usedZIndexes.delete(zIndex);
  }

  // Get a z-index that's guaranteed to be above a specific value
  getZIndexAbove(minZIndex: number): number {
    let zIndex = Math.max(minZIndex + 1, this.baseZIndex);
    
    while (this.usedZIndexes.has(zIndex)) {
      zIndex += 10;
    }

    this.usedZIndexes.add(zIndex);
    return zIndex;
  }

  // Reset all z-indexes (useful for testing)
  reset(): void {
    this.usedZIndexes.clear();
  }
}

export default ZIndexManager;