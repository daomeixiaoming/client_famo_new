import { ResMgr } from "./ResMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundMgr extends cc.Component {

    public static Instance: SoundMgr = null as unknown as SoundMgr;
    private static MAX_SOUNDS: number = 8; // 最大音效的数目

    private nowIndex: number = 0;
    private sounds: Array<cc.AudioSource> = [];
    private bgMusic: cc.AudioSource = null as unknown as cc.AudioSource;

    private isMusicMute: boolean = false;   //是否背景音乐静音
    private isSoundMute: boolean = false;   //是否音效静音

    onLoad(): void {
        if (SoundMgr.Instance === null) {
            SoundMgr.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        for (let i = 0; i < SoundMgr.MAX_SOUNDS; i++) {
            var as = this.node.addComponent(cc.AudioSource);
            this.sounds.push(as);
        }

        this.bgMusic = this.node.addComponent(cc.AudioSource) as cc.AudioSource;

        // 从本地存储里面把设置读出来, 0, 1
        var value = localStorage.getItem("GAME_MUSIC_MUTE");
        if (value) {
            let v = parseInt(value);
            this.isMusicMute = (v === 1) ? true : false;
        }

        value = localStorage.getItem("GAME_SOUND_MUTE");
        if (value) {
            let v = parseInt(value);
            this.isSoundMute = (v === 1) ? true : false;
        }
    }

    // 播放背景音乐
    public playBgMusic(clip: cc.AudioClip, isLoop: boolean): void {
        this.bgMusic.clip = clip;
        this.bgMusic.loop = isLoop;
        this.bgMusic.volume = (this.isMusicMute) ? 0 : 1.0;
        this.bgMusic.play();
    }

    // 停止背景音乐
    public stopBgMusic(): void {
        this.bgMusic.stop();
    }

    // 播放音效
    public playSound(clip: cc.AudioClip): void {
        if (this.isSoundMute === true) {
            return;
        }

        var as = this.sounds[this.nowIndex];
        this.nowIndex++;
        if (this.nowIndex >= SoundMgr.MAX_SOUNDS) {
            this.nowIndex = 0;
        }

        as.clip = clip;
        as.loop = false;
        as.volume = 1;
        as.play();
    }

    public playSoundOneShot(clip: cc.AudioClip): void {
        var as = this.sounds[this.nowIndex];
        this.nowIndex++;
        if (this.nowIndex >= SoundMgr.MAX_SOUNDS) {
            this.nowIndex = 0;
        }

        as.clip = clip;
        as.loop = false;
        as.play();
    }

    /**
     * 设置背景音乐静音状态
     * @param isMute true是静音
     */
    public setMusicMute(isMute: boolean): void {
        this.isMusicMute = isMute;
        this.bgMusic.volume = (this.isMusicMute) ? 0 : 1.0;

        // localStorage
        let value = (isMute) ? 1 : 0;
        localStorage.setItem("GAME_MUSIC_MUTE", value.toString());
        // end
    }

    // 设置背音效静音状态
    public setSoundsMute(isMute: boolean): void {
        this.isSoundMute = isMute;

        // localStorage
        let value = (isMute) ? 1 : 0;
        localStorage.setItem("GAME_SOUND_MUTE", value.toString());

        for (let i = 0; i < this.sounds.length; i++) {
            let as: cc.AudioSource = this.sounds[i];
            as.mute = isMute;
        }
    }

    public getAudioClip(abName: string, path: string): cc.AudioClip | null {
        let clip = ResMgr.Instance.getAsset(abName, path, cc.AudioClip) as cc.AudioClip;
        return clip;
    }

    // 停止所有的音效
    public stopAllAudio(): void {
        // DebugUtils.Log("==========stopAllAudio==========");
        cc.audioEngine.stopAll();
    }
}
