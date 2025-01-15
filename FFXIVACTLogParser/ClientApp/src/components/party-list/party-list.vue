<style scoped src="./party-list.scss"></style>

<template>
    <section class="party-list-container">
        <Panel header="Party Composition">
            <div class="party-list-content">
                <div class="party-member-container">
                    <div class="role-container">
                        <div class="role-content">
                            <img src="../../assets/class-icons/tank.png">
                            <span>Tanks</span>
                        </div>
                        <Divider layout="vertical" />
                    </div>
                    <div class="party-members-content">
                        <PartyMember
                            job="gunbreaker"
                            name="Neela Natasch"></PartyMember>
                        <PartyMember
                            job="paladin"
                            name="Locke Hearthfire"></PartyMember>
                    </div>
                </div>
                <div class="party-member-container">
                    <div class="role-container">
                        <div class="role-content">
                            <img src="../../assets/class-icons/healer.png">
                            <span>Healers</span>
                        </div>
                        <Divider layout="vertical" />
                    </div>
                    <div class="party-members-content">
                        <PartyMember
                            job="sage"
                            name="Y'lenia Fhey"></PartyMember>
                        <PartyMember
                            job="astrologian"
                            name="Ayo Bun"></PartyMember>
                    </div>
                </div>
                <div class="party-member-container">
                    <div class="role-container">
                        <div class="role-content">
                            <img src="../../assets/class-icons/dps.png">
                            <span>DPS</span>
                        </div>
                        <Divider layout="vertical" />
                    </div>
                    <div class="party-members-content">
                        <PartyMember
                            job="dragoon"
                            name="Tact Toast"></PartyMember>
                        <PartyMember
                            job="monk"
                            name="Chiaki Shirogane"></PartyMember>
                        <PartyMember
                            job="pictomancer"
                            name="Fisherman Fizz"></PartyMember>
                        <PartyMember
                            job="dancer"
                            name="Auri Astraea"></PartyMember>
                    </div>
                </div>
            </div>
        </Panel>
    </section>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import PartyMember from '../party-member/party-member.vue';
import Panel from 'primevue/panel';

</script>