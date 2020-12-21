import { ref } from 'vue';

export const toggleable = () => {
    const visible = ref(false);

    const toggle = (to) => {
        visible.value = to !== undefined ? to : ! visible.value;
    }

    return {
        visible,
        toggle
    }
};
