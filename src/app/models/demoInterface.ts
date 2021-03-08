import { InjectionToken } from '@angular/core';

export interface FontSize{
    fontSize:number;
}

export const fontSize : FontSize = {
    fontSize: 20
}

export const FONT_SIZE = new InjectionToken<FontSize>('fontsize');